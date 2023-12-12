/** @format */
"use client";

import { useState } from "react";
import CreatedateDescriptionobile from "./CreatedateDescriptionobile";
import CreateDateInfoMobile from "./CreateDateInfoMobile";
import CreateDateInviteDjMobile from "./CreateDateInviteDjMobile";
import { Paper, Button } from "@mui/material";
import styles from "./styles.module.css";
import { useSelector, useDispatch } from "react-redux";
import { ArrowBackIosRounded } from "@mui/icons-material";
import { RootState } from "@/store/rootStore";
import { useRouter } from "next/navigation";
import { createSpecificEventContainer } from "@/api_functions/postCreateSpecificEvent/postCreateSpecificEventContainer";
import { switchPageDate, setToDefaultDate } from "@/store/CreateEventDateSlice";
import { Auth } from "aws-amplify";

interface PromoterCreateSpecificEventDateMobileProps {
	baseEventIdFromParams: string;
}

function PromoterCreateSpecificEventDateMobile({
	baseEventIdFromParams,
}: PromoterCreateSpecificEventDateMobileProps) {
	const dispatch = useDispatch();
	const router = useRouter();

	const [errorMessage, setErrorMessage] = useState("");
	const [dateUuid, setDateUuid] = useState("");

	const { page } = useSelector((state: RootState) => state.promoterCreateDate);

	const EventData = useSelector((state: RootState) => state.promoterCreateDate);

	const EventFromRedux = useSelector(
		(state: RootState) => state.PromoterEventPageV2pt0Slice.event_data
	);

	async function handleCreateEvent() {
		try {
			const user = await Auth.currentAuthenticatedUser();
			const roleId = user.attributes["custom:RoleId"];
			const stringPromoterId: string =
				typeof roleId === "number" ? roleId.toString() : roleId;
			createSpecificEventContainer(
				stringPromoterId,
				EventData,
				Number(baseEventIdFromParams),
				EventFromRedux.event_name,
				EventFromRedux.event_tagline
			).then(async (res: any) => {
				if (res.specificEventId) {
					setDateUuid(res.DjDateInviteUrlKey);
					dispatch(switchPageDate({ page: "DjInvite" }));
				} else if (res.message === "An event already exists on this date.") {
					dispatch(switchPageDate({ page: "specificEvent" }));
					setErrorMessage("An event already exists on this date");
				}
			});
		} catch {
			console.log("error creating event");
		}
	}

	function handleDone() {
		dispatch(setToDefaultDate());
		router.push(
			`/m/promoter/event/${EventFromRedux.event_name.trim().toLowerCase()}`
		);
	}

	return (
		<>
			<Paper square className={styles.paper_header}>
				<div className={styles.paper_header_helper}>
					<Button
						onClick={handleDone}
						size="small"
						color="secondary"
						sx={{ position: "absolute", left: "0px" }}
						startIcon={<ArrowBackIosRounded />}>
						back
					</Button>
					Event Date Info
				</div>
			</Paper>
			<div className={styles.main_div}>
				{page === "specificEvent" ? (
					<CreateDateInfoMobile
						dateErrorMessage={errorMessage}
						setDateErrorMessage={setErrorMessage}
					/>
				) : page === "specificEventDesc" ? (
					<CreatedateDescriptionobile handleCreateEvent={handleCreateEvent} />
				) : (
					<CreateDateInviteDjMobile handleDone={handleDone} uuid={dateUuid} />
				)}
			</div>
		</>
	);
}

export default PromoterCreateSpecificEventDateMobile;
