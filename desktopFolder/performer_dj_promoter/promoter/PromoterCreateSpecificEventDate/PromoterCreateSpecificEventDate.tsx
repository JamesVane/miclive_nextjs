/** @format */
"use client";

import { useState } from "react";
import styles from "./styles.module.css";
import CreateDateInfo from "./CreateDateInfo";
import CreatedateDescription from "./CreatedateDescription";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/rootStore";
import CreateDateInviteDj from "./CreateDjInviteDj";
import { createSpecificEventContainer } from "@/api_functions/postCreateSpecificEvent/postCreateSpecificEventContainer";
import { switchPageDate, setToDefaultDate } from "@/store/CreateEventDateSlice";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import HomeBarV2 from "@desk/HomeBarV2";
import { CloseRounded } from "@mui/icons-material";
import { Tabs, Tab, Button } from "@mui/material";

interface PromoterCreateSpecificEventDateProps {
	baseEventIdFromParams: string;
}

function PromoterCreateSpecificEventDate({
	baseEventIdFromParams,
}: PromoterCreateSpecificEventDateProps) {
	const router = useRouter();
	const dispatch = useDispatch();
	const [errorMessage, setErrorMessage] = useState("");
	const [dateUuid, setDateUuid] = useState("");

	const baseEventId = Number(baseEventIdFromParams);

	const { page } = useSelector((state: RootState) => state.promoterCreateDate);

	const EventFromRedux = useSelector(
		(state: RootState) => state.PromoterEventPageV2pt0Slice.event_data
	);

	const EventData = useSelector((state: RootState) => state.promoterCreateDate);

	function handleDone() {
		dispatch(setToDefaultDate());
		router.push(
			`/promoter/event/${EventFromRedux.event_name.trim().toLowerCase()}`
		);
	}

	async function handleCreateEvent() {
		try {
			const user = await Auth.currentAuthenticatedUser();
			const roleId = user.attributes["custom:RoleId"];
			const stringPromoterId: string =
				typeof roleId === "number" ? roleId.toString() : roleId;

			createSpecificEventContainer(
				stringPromoterId,
				EventData,
				baseEventId,
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

	return (
		<>
			<HomeBarV2 noMessage={true} hasProfile={false}>
				<Button
					sx={{ position: "absolute", left: "230px" }}
					size="large"
					variant="outlined"
					startIcon={<CloseRounded />}
					color="error"
					onClick={handleDone}>
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
							label="Create Event Date"
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
				<div className={styles.main_div}>
					{page === "specificEvent" ? (
						<CreateDateInfo
							setDateErrorMessage={setErrorMessage}
							dateErrorMessage={errorMessage}
						/>
					) : page === "specificEventDesc" ? (
						<CreatedateDescription handleCreateEvent={handleCreateEvent} />
					) : (
						<CreateDateInviteDj uuid={dateUuid} handleDone={handleDone} />
					)}
				</div>
			</div>
		</>
	);
}

export default PromoterCreateSpecificEventDate;
