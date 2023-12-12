/** @format */
"use client";

import { useEffect, useState } from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import {
	AudioFileRounded,
	BookmarksRounded,
	ConfirmationNumberRounded,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getPerformerProfileAudioKeys } from "@/api_functions/getPerformerProfileAudioKeys";
import { setPerformerAudioKey } from "@/store/performerAudioKeysStore";
import SplashPage from "@/SplashPage";
import MessagingButton from "@mobi/Messaging/MessagingButton";
import { Auth } from "aws-amplify";
import styles from "./styles.module.css";
import { getPerformerFollowingListV2point0 } from "@/api_functions/getPerformerFollowingListV2point0";
import { setPerformerFollowingArrayV2Slice } from "@/store/performerFollowingArrayV2Slice";
import { getPerformerTicketEventsV2pt0 } from "@/api_functions/getPerformerTicketEventsV2pt0";
import { setPerformerTicketsV2pt0 } from "@/store/performerTicketsV2pt0";
import PerformerFollowingPage from "../Performer/PerformerFollowingPage";
import PerformerTicketPage from "../Performer/PerformerTicketPage";
import AppBarMobile from "@mobi/AppBarMobile";
import PerformerMyAudioPage from "./PerformerMyAudioPage";
import { useSessionState } from "@/custom_hooks/useSessionState";

function PerformerHome() {
	const router = useRouter();
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [selectedTab, setSelectedTab] = useSessionState<
		"following" | "my_events" | "my_audio"
	>("performerTabMobile", "following");

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
					{" "}
					<AppBarMobile profileButton>
						<>
							{selectedTab === "following"
								? "Followed Events"
								: selectedTab === "my_events"
								? "My Events"
								: selectedTab === "my_audio"
								? "My Audio"
								: null}
						</>
					</AppBarMobile>
					<>
						{selectedTab === "following" ? (
							<PerformerFollowingPage />
						) : selectedTab === "my_events" ? (
							<PerformerTicketPage />
						) : selectedTab === "my_audio" ? (
							<PerformerMyAudioPage />
						) : null}
					</>
					<div className={styles.fade_div} />
					<div className={styles.bottom_div}>
						<div className={styles.nav_paper}>
							<BottomNavigation
								showLabels
								value={selectedTab}
								onChange={(event, newValue) => {
									setSelectedTab(newValue);
								}}>
								<BottomNavigationAction
									label="Following"
									value="following"
									icon={<BookmarksRounded />}
								/>
								<BottomNavigationAction
									label="My Events"
									value="my_events"
									icon={<ConfirmationNumberRounded />}
								/>
								<BottomNavigationAction
									label="My Audio"
									value="my_audio"
									icon={<AudioFileRounded />}
								/>
							</BottomNavigation>
						</div>
						<MessagingButton notAbsolute />
					</div>
				</>
			)}
		</>
	);
}

export default PerformerHome;

// const [eventIsStarting, setEventIsStarting] = useState(false);

/* useEffect(() => {
		const currentTime = 1681952700000;
		function checkIfStarting() {
			if (performerTickets.upcoming[0]) {
				if (
					currentTime >=
					performerTickets.upcoming[0].start_time - 30 * 60 * 1000
				) {
					console.log("SHOULD BE STARTING");
					setEventIsStarting(true);
				} else {
					console.log("SHOULD NOT BE STARTING");
					setEventIsStarting(false);
				}
			}
		}
		checkIfStarting();

		const intervalId = setInterval(checkIfStarting, 60 * 500);

		return () => clearInterval(intervalId);
	}, [performerTickets]); */
