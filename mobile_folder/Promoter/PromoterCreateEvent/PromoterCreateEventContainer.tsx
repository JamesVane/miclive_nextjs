/** @format */
"use client";

import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/store/rootStore";
import { useDispatch } from "react-redux";
import { createBaseAndSpecificEventContainer } from "@/api_functions/postCreateBaseAndSpecificEvent/postCreateBaseAndSpecificEventContainer";
import { postUploadS3Image } from "@/api_functions/postUploadS3Image";
import CreateBaseEventMobile from "./CreateBaseEventMobile";
import CreateSpecificEventMobile from "./CreateSpecificEventMobile";
import CreateEventDescMobile from "./CreateEventDescMobile";
import InviteDjPageMobile from "./InviteDjPageMobile";
import { switchPage, setToDefault } from "@/store/promoterCreateEventSlice";
import styles from "./styles.module.css";
import { Paper } from "@mui/material";
import { Crop } from "react-image-crop";
import BaseEventDescriptionMobile from "./BaseEventDescriptionMobile";
import CreateEventBanner from "./CreateEventBanner";
import { Auth } from "aws-amplify";

export type State = {
	src: string | ArrayBuffer | null;
	crop: Crop;
	croppedImageUrl: string | null;
};

function PromoterCreateEventContainer() {
	const dispatch = useDispatch();
	const EventData = useSelector(
		(state: RootState) => state.promoterCreateEvent
	);
	const [errorMessage, setErrorMessage] = useState("");

	const defaultCropSelectState = {
		src: null,
		crop: {
			x: 0,
			y: 0,
			width: 150,
			height: 150,
			aspect: 1,
			unit: "px",
			minWidth: 10,
			minHeight: 10,
			maxWidth: 500,
			maxHeight: 500,
		} as Crop,
		croppedImageUrl: null,
	};

	const [CropSelectstate, setCropSelectState] = useState<State>(
		defaultCropSelectState
	);

	const handleUpdateDjKeyState = ({
		dateKey,
		eventKey,
	}: {
		dateKey: string;
		eventKey: string;
	}) => {
		localStorage.setItem("inviteDateKey", dateKey);
		localStorage.setItem("inviteEventKey", eventKey);
	};

	async function handleCreateEvent() {
		try {
			const user = await Auth.currentAuthenticatedUser();
			const roleId = user.attributes["custom:RoleId"];

			const stringPromoterId =
				typeof roleId === "number" ? roleId.toString() : roleId;
			createBaseAndSpecificEventContainer(stringPromoterId, EventData).then(
				async (res) => {
					if (res.baseEventId) {
						handleUpdateDjKeyState({
							dateKey: res.DjDateInviteUrlKey,
							eventKey: res.DjEventInviteUrlKey,
						});
						const [threeBanner, fourBanner] = await Promise.all([
							postUploadS3Image(
								EventData.baseEvent.banner3X10,
								`event_banner_3X1/banner_${res.baseEventId}`
							),
							postUploadS3Image(
								EventData.baseEvent.banner4X10,
								`event_banner_4X1/banner_${res.baseEventId}`
							),
						]);
						postUploadS3Image(
							EventData.baseEvent.imageFile,
							`event_pictures/event_${res.baseEventId}.jpg`
						).then(async (res) => {
							// const eventInfo = await getPromoterEventInfo(promoter_id);
							// dispatch(setPromoterEventInfoSlice(eventInfo));
							dispatch(setToDefault());
							dispatch(switchPage({ page: "DjInvite" }));
						});
					} else if (res.message === "An event already exists on this date.") {
						dispatch(switchPage({ page: "specificEvent" }));
						setErrorMessage("An event already exists on this date");
					}
				}
			);
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<Paper square className={styles.page_header_text}>
				{EventData.page === "baseEvent"
					? "Base Event Information"
					: EventData.page === "Banner"
					? "Event Banner"
					: EventData.page === "baseEventDescription"
					? "Event Description"
					: EventData.page === "specificEvent"
					? "Specific Event Information"
					: EventData.page === "specificEventDesc"
					? "Event Date Description"
					: EventData.page === "DjInvite"
					? "Invite DJ"
					: null}
			</Paper>
			{EventData.page === "baseEvent" ? (
				<CreateBaseEventMobile
					CropSelectstate={CropSelectstate}
					setCropSelectState={setCropSelectState}
				/>
			) : EventData.page === "Banner" ? (
				<CreateEventBanner />
			) : EventData.page === "baseEventDescription" ? (
				<BaseEventDescriptionMobile />
			) : EventData.page === "specificEvent" ? (
				<CreateSpecificEventMobile
					setDateErrorMessage={setErrorMessage}
					dateErrorMessage={errorMessage}
				/>
			) : EventData.page === "specificEventDesc" ? (
				<CreateEventDescMobile handleCreateEvent={handleCreateEvent} />
			) : EventData.page === "DjInvite" ? (
				<InviteDjPageMobile />
			) : null}
		</>
	);
}

export default PromoterCreateEventContainer;
