/** @format */
"use client";

import { useEffect, useState } from "react";
import PerformerProfileMP3 from "./PerformerProfileMP3";
import HomeBarV2 from "@desk/HomeBarV2";
import { Auth } from "aws-amplify";
import { Tabs, Tab } from "@mui/material";
import PerformerFollowingPage from "./PerformerFollowingPage";
import PerformerTicketsPageDesktop from "./PerformerTicketsPageDesktop";
import { getPerformerFollowingListV2point0 } from "@/api_functions/getPerformerFollowingListV2point0";
import { setPerformerFollowingArrayV2Slice } from "@/store/performerFollowingArrayV2Slice";
import { useDispatch } from "react-redux";
import SplashPage from "@/SplashPage";
import { getPerformerTicketEventsV2pt0 } from "@/api_functions/getPerformerTicketEventsV2pt0";
import { setPerformerTicketsV2pt0 } from "@/store/performerTicketsV2pt0";
import PerformerEventDateModalV2 from "./PerformerEventDateModalV2";
import { getPerformerProfileAudioKeys } from "@/api_functions_need_to_add_auth/getPerformerProfileAudioKeys";
import { setPerformerAudioKey } from "@/store/performerAudioKeysStore";
// import { useSessionState } from "@/custom_hooks/useSessionState";

// THIS WILL GET USER ATTRIBUTES FROM THE BACKEND AND NOT THE CACHE
// const user = await Auth.currentAuthenticatedUser({ bypassCache: true });

interface PerformerHomeProps {
	dateOpened?: boolean;
	openSpecificEventId?: string;
}

function PerformerHome({
	dateOpened,
	openSpecificEventId,
}: PerformerHomeProps) {
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(true);
	// const [performerPage, setPerformerPage] = useSessionState("performerPage", 0);
	const [performerPage, setPerformerPage] = useState(0);

	function handleTabChange(event: React.SyntheticEvent, newValue: number) {
		setPerformerPage(newValue);
	}

	async function initPerformerData() {
		const user = await Auth.currentAuthenticatedUser();
		const roleId = user.attributes["custom:RoleId"];

		const [audioKeys, performerFollowingObj, performerTicketData] =
			await Promise.all([
				getPerformerProfileAudioKeys(roleId),
				getPerformerFollowingListV2point0(),
				getPerformerTicketEventsV2pt0(),
			]);

		if (performerTicketData) {
			dispatch(setPerformerTicketsV2pt0(performerTicketData));
		}
		if (performerFollowingObj) {
			dispatch(setPerformerFollowingArrayV2Slice(performerFollowingObj));
		}

		if (audioKeys) {
			dispatch(setPerformerAudioKey(audioKeys));
		}
	}

	useEffect(() => {
		initPerformerData().then(() => setIsLoading(false));
	}, []);

	return (
		<>
			{isLoading ? (
				<SplashPage />
			) : (
				<>
					{dateOpened && openSpecificEventId ? (
						<PerformerEventDateModalV2
							specificIdfromParams={openSpecificEventId}
							isFromTicketsPage
						/>
					) : null}
					<HomeBarV2 hasProfile hasAccountAlertsSection>
						<div
							style={{
								height: "100%",
								display: "flex",
								flexDirection: "row",
								alignItems: "flex-end",
							}}>
							<Tabs
								value={performerPage}
								onChange={handleTabChange}
								aria-label="basic tabs example">
								<Tab sx={{ fontSize: "25px" }} label="following" value={0} />
								<Tab sx={{ fontSize: "25px" }} label="my events" value={1} />
								<Tab sx={{ fontSize: "25px" }} label="my audio" value={2} />
							</Tabs>
						</div>
					</HomeBarV2>
					<div
						style={{
							marginTop: "70px",
							width: "100%",
							height: "calc(100vh - 70px)",
							minHeight: "calc(100vh - 70px)",
							maxHeight: "calc(100vh - 70px)",
							position: "relative",
						}}>
						{performerPage === 0 ? (
							<PerformerFollowingPage />
						) : performerPage === 1 ? (
							<PerformerTicketsPageDesktop />
						) : performerPage === 2 ? (
							<PerformerProfileMP3 />
						) : null}
					</div>
				</>
			)}
		</>
	);
}

export default PerformerHome;

// PerformerTicketAudioComponent
// PerformerTicketAudioSelectModal
// PerformerTicketAudioSelectRow
// PerformerTicketSubmitAudioPaper
// <PerformerAddNewAudioToEventModal refreshTickets={() => {}} />
