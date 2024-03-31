/** @format */
"use client";

import { useSelector } from "react-redux";
import { useState } from "react";
import { RootState } from "@/app/LocalizationProviderHelper";
import CreateBaseEvent from "./CreateBaseEvent";
import CreateEventDesc from "./CreateEventDesc";
import CreateSpecificEvent from "./CreateSpecificEvent";
import InviteDjPage from "./InviteDjPage";
import { useDispatch } from "react-redux";
import { createBaseAndSpecificEventContainer } from "@/api_functions/postCreateBaseAndSpecificEvent/postCreateBaseAndSpecificEventContainer";
import { postUploadS3Image } from "@/api_functions_need_to_add_auth/postUploadS3Image";
import {
	switchPage,
	setToDefault,
	setDjDateKey,
	setDjEventKey,
} from "@/store/promoterCreateEventSlice";
import CreateBaseEventDescription from "./CreateBaseEventDescription";
import { useRouter } from "next/navigation";
import { getPromoterEventListV2pt0 } from "@/api_functions/getPromoterEventListV2pt0";
import { setPromoterEventListV2pt0Slice } from "@/store/promoterEventListV2pt0Slice";
import CreateEventBanner from "./CreateEventBanner";
import HomeBarV2 from "@desk/HomeBarV2";
import { Tabs, Tab, Button } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { deleteImageFromS3 } from "@/api_functions/deleteImageFromS3";
import { updateDateImageArray } from "@/api_functions/updateDateImageArray";
import { updateBaseEventImageArray } from "@/api_functions/updateBaseEventImageArray";

function PromoterCreateEventContainer() {
	const router = useRouter();
	const dispatch = useDispatch();
	const EventData = useSelector(
		(state: RootState) => state.promoterCreateEvent
	);
	const [errorMessage, setErrorMessage] = useState("");

	const handleUpdateDjKeyState = ({
		dateKey,
		eventKey,
	}: {
		dateKey: string;
		eventKey: string;
	}) => {
		router.push(location.pathname);
	};

	/* const handleUpdateDjKeyState = ({
		dateKey, 
		eventKey,
	}: {
		dateKey: string;https://nextjs.org/docs/getting-started
		eventKey: string;
	}) => {
		router.push(location.pathname, {
			state: {
				...location.state,
				inviteDateKey: dateKey,
				inviteEventKey: eventKey,
			},
			replace: true,
		});
	}; */

	function handleExit() {
		router.push("/promoter");
	}

	async function getDateReturnArray(specificEventId: string) {
		let holdEditArray = [];
		const image_array = EventData.dateImageArray;
		const description = EventData.description;
		for (let x in image_array) {
			if (description?.includes(image_array[x])) {
				holdEditArray.push(image_array[x]);
			} else {
				deleteImageFromS3(image_array[x]);
			}
		}
		updateDateImageArray(specificEventId, holdEditArray);
	}

	async function getEventReturnArray(baseEventId: string) {
		let holdEditArray = [];

		const editArray = EventData.baseEventImageArray;
		const description = EventData.baseEventDescription;

		for (let x in editArray) {
			if (description?.includes(editArray[x])) {
				holdEditArray.push(editArray[x]);
			} else {
				deleteImageFromS3(editArray[x]);
			}
		}

		updateBaseEventImageArray(baseEventId, holdEditArray);
	}

	async function handleCreateEvent() {
		try {
			createBaseAndSpecificEventContainer(EventData).then(async (res) => {
				const DjDateInviteUrlKey = res.DjDateInviteUrlKey;
				const DjEventInviteUrlKey = res.DjEventInviteUrlKey;
				dispatch(setDjDateKey(DjDateInviteUrlKey));
				dispatch(setDjEventKey(DjEventInviteUrlKey));
				if (res.baseEventId) {
					await getDateReturnArray(res.specificEventId.toString());
					await getEventReturnArray(res.baseEventId.toString());

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
					).then(async () => {
						try {
							getPromoterEventListV2pt0().then((res) => {
								if (res) {
									dispatch(setPromoterEventListV2pt0Slice(res));
								}
							});
						} catch (err) {
							console.log("Error fetching user profile or perform er data");
						}
						dispatch(switchPage({ page: "DjInvite" }));
					});
				} else if (res.message === "An event already exists on this date.") {
					dispatch(switchPage({ page: "specificEvent" }));
					setErrorMessage("An event already exists on this date");
				}
			});
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<HomeBarV2 noMessage={true} hasProfile={false}>
				<Button
					sx={{ position: "absolute", left: "230px" }}
					size="large"
					variant="outlined"
					startIcon={<CloseRounded />}
					color="error"
					onClick={handleExit}>
					exit
				</Button>
				<div
					style={{
						height: "100%",
						display: "flex",
						flexDirection: "row",
						alignItems: "flex-end",
					}}>
					<Tabs
						value={"create"}
						onChange={() => {}}
						textColor="primary"
						indicatorColor="primary">
						<Tab
							value="create"
							label="Create Event"
							sx={{ fontSize: "25px" }}
						/>
					</Tabs>
				</div>
			</HomeBarV2>
			<div
				style={{
					marginTop: "70px",
					width: "100vw",
					height: "calc(100vh - 70px)",
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
					position: "relative",
				}}>
				{EventData.page === "baseEvent" ? (
					<CreateBaseEvent />
				) : EventData.page === "Banner" ? (
					<CreateEventBanner />
				) : EventData.page === "baseEventDescription" ? (
					<CreateBaseEventDescription />
				) : EventData.page === "specificEvent" ? (
					<CreateSpecificEvent
						setDateErrorMessage={setErrorMessage}
						dateErrorMessage={errorMessage}
					/>
				) : EventData.page === "specificEventDesc" ? (
					<CreateEventDesc handleCreateEvent={handleCreateEvent} />
				) : EventData.page === "DjInvite" ? (
					<InviteDjPage />
				) : null}
			</div>
		</>
	);
}

export default PromoterCreateEventContainer;
