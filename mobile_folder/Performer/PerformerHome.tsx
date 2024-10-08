/** @format */
"use client";

import { useEffect, useState } from "react";
import {
	BottomNavigation,
	BottomNavigationAction,
	Button,
} from "@mui/material";
import {
	AudioFileRounded,
	BookmarksRounded,
	ConfirmationNumberRounded,
	EventAvailableRounded,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getPerformerProfileAudioKeys } from "@/api_functions_need_to_add_auth/getPerformerProfileAudioKeys";
import { setPerformerAudioKey } from "@/store/performerAudioKeysStore";
import SplashPage from "@/SplashPage";
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
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
// import { useSessionState } from "@/custom_hooks/useSessionState";

function PerformerHome() {
	const router = useRouter();
	const dispatch = useDispatch();

	const { upcoming: upcomingArray } = useSelector(
		(state: RootState) => state.performerTicketsV2pt0
	);

	const [isLoading, setIsLoading] = useState(true);
	const [selectedTab, setSelectedTab] = useState<
		"following" | "my_events" | "my_audio"
	>("following");
	/* const [selectedTab, setSelectedTab] = useSessionState<
		"following" | "my_events" | "my_audio"
	>("performerTabMobile", "following"); */

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

	const currentEvent =
		upcomingArray && upcomingArray.length > 0 ? upcomingArray[0] : null;

	function adjustEventName(eventNameInput: string): string {
		return eventNameInput.replace(/\s/g, "").toLowerCase();
	}

	function handleGoToCurrentEvent() {
		if (currentEvent) {
			const nameSlug = adjustEventName(currentEvent.event_name);
			router.push(
				`/performer/event/${currentEvent.specific_event_id}/${nameSlug}`
			);
		}
	}

	return (
		<>
			{isLoading ? (
				<SplashPage />
			) : (
				<>
					{" "}
					<AppBarMobile profileButton>
						<div className={styles.title_box}>
							{selectedTab === "following"
								? "FOLLOWED EVENTS"
								: selectedTab === "my_events"
								? "MY EVENTS"
								: selectedTab === "my_audio"
								? "MY AUDIO"
								: null}
							<div className={styles.title_underline} />
						</div>
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
					<div className={styles.bottom_bumper} />
					<div className={styles.fade_div} />
					<div className={styles.current_event_div}>
						<Button
							onClick={handleGoToCurrentEvent}
							size="large"
							color="success"
							variant="contained"
							startIcon={<EventAvailableRounded />}>
							go to current event
						</Button>
					</div>
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
