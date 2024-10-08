/** @format */

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import {
	Button,
	Avatar,
	BottomNavigation,
	BottomNavigationAction,
	IconButton,
	Tabs,
	Tab,
	Box,
} from "@mui/material";
import {
	CloseRounded,
	SearchRounded,
	EditRounded,
	FormatListNumberedRtlRounded,
	InfoRounded,
	AudioFileRounded,
	AccountCircleRounded,
	IosShareRounded,
	CheckRounded,
	CoffeeRounded,
	MusicNoteRounded,
} from "@mui/icons-material";
import PerformerCurrentEventInfo from "./PerformerCurrentEventInfo";
import PerformerCurrentEventRoster from "./PerformerCurrentEventRoster/PerformerCurrentEventRoster";
import EventDateAudioSubmit from "@mobi/EventDatePage/EventDateAudioSubmit";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import AvatarSimpleMobile from "@mobi/small_components/AvatarSimpleMobile";
import DividerH from "@/universalComponents/DividerH";
import { useQuery } from "@tanstack/react-query";
import { getPerformerCurrentEventState } from "@/api_functions/getPerformerCurrentEventState";
import SplashPage from "@/SplashPage";
import { useInterval } from "@/useInterval/useInterval";
import { getIntermissionStampFromSpecificId } from "@/api_functions/getIntermissionStampFromSpecificId";
import { setCurrentEventSpecificEventId } from "@/store/currentEventSpecificEventIdSlice";
import { useDispatch } from "react-redux";
import { intermissionTimestampToMMSS } from "@/generic_functions/time_formaters";
import { Bars } from "react-loader-spinner";

interface PerformerCurrentEventProps {
	myRoleId: number;
	handleExitModal: () => void;
	specificEventIdFromParams: number;
}

function PerformerCurrentEvent({
	myRoleId,
	handleExitModal,
	specificEventIdFromParams,
}: PerformerCurrentEventProps) {
	const dispatch = useDispatch();

	const [tab, setTab] = useState("roster");
	const [intermissionTime, setIntermissionTime] = useState(0);
	const [intermissionEndedLoading, setIntermissionEndedLoading] =
		useState(false);

	const {
		status: timestampStatus,
		data: imtermissionTimestampFromQuery,
		error: timestampError,
		isFetching: timestampIsFetching,
		refetch: timestampRefetch,
	} = useQuery({
		queryKey: [
			"performerCurrentEventTimestamp",
			{
				request_specific_event_id: Number(specificEventIdFromParams),
			},
		],
		queryFn: getIntermissionStampFromSpecificId,
	});

	const {
		status,
		data: eventInfo,
		error,
		isFetching,
		refetch,
	} = useQuery({
		queryKey: [
			"performerCurrentEventState",
			{
				request_specific_event_id: specificEventIdFromParams,
			},
		],
		queryFn: getPerformerCurrentEventState,
	});

	const IntermissionTimestamp =
		imtermissionTimestampFromQuery && imtermissionTimestampFromQuery !== ""
			? imtermissionTimestampFromQuery
			: null;

	useEffect(() => {
		if (IntermissionTimestamp) {
			const endTime = new Date(IntermissionTimestamp).getTime();
			const now = new Date().getTime();
			const timeInSeconds = Math.max(Math.floor((endTime - now) / 1000), 0);

			setIntermissionTime(timeInSeconds);
		} else {
			setIntermissionTime(0);
		}
	}, [IntermissionTimestamp]);

	useInterval(
		() => {
			if (intermissionTime > 0) {
				setIntermissionTime((prevTime) => {
					if (prevTime <= 1) {
						setIntermissionEndedLoading(true);
						return 0; // reset time
					}
					return prevTime - 1;
				});
			}
		},
		intermissionTime > 0 ? 1000 : null
	);

	useEffect(() => {
		if (eventInfo?.event.specific_event_id) {
			dispatch(
				setCurrentEventSpecificEventId(eventInfo.event.specific_event_id)
			);
		} else {
			dispatch(setCurrentEventSpecificEventId(null));
		}
	}, [eventInfo]);

	useEffect(() => {
		setIntermissionEndedLoading(false);
	}, [imtermissionTimestampFromQuery]);

	const displayIntermission = intermissionTime && intermissionTime !== 0;

	return (
		<>
			{status === "pending" && eventInfo ? (
				<SplashPage />
			) : (
				<div className={styles.main_div}>
					<div className={styles.header_paper}>
						<div className={styles.back_name_div}>
							<Button
								color="secondary"
								onClick={handleExitModal}
								startIcon={<CloseRounded />}
								sx={{ position: "absolute", left: 0 }}>
								exit
							</Button>
							<IconButton
								sx={{
									position: "absolute",
									right: "5px",
									height: "35px",
									width: "35px",
								}}
								color="primary">
								<AccountCircleRounded sx={{ height: "35px", width: "35px" }} />
							</IconButton>
							{tab === "event info" ? (
								<div className={styles.header_buttons}>
									<Button size="small" startIcon={<CheckRounded />}>
										follow
									</Button>
									<Button
										sx={{
											marginLeft: "5px",
										}}
										size="small"
										startIcon={<IosShareRounded />}>
										share
									</Button>
								</div>
							) : (
								<>
									{eventInfo ? (
										intermissionEndedLoading || displayIntermission !== 0 ? (
											<Box
												sx={{
													color: "warning.main",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													flexDirection: "row",
												}}>
												<CoffeeRounded
													sx={{
														marginRight: "5px",
														marginBottom: "-5px",
													}}
												/>
												{intermissionEndedLoading ? (
													<div
														style={{
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
															flexDirection: "row",
														}}>
														<div style={{ marginRight: "5px" }}>
															Intermission
														</div>
														<Bars height={17} width={17} color="#fea726" />
													</div>
												) : (
													`Intermission ${intermissionTimestampToMMSS(
														intermissionTime
													)}`
												)}
											</Box>
										) : (
											<Box
												sx={{
													color: eventInfo.event.event_has_started
														? "success.main"
														: "warning.main",
												}}>
												{eventInfo.event.event_has_started ? (
													<>
														<MusicNoteRounded
															sx={{
																marginBottom: "-5px",
															}}
														/>{" "}
														Event in progress
													</>
												) : (
													"Waiting to start"
												)}
											</Box>
										)
									) : null}
								</>
							)}
						</div>
					</div>
					<div className={styles.bottom_tabs}>
						<BottomNavigation
							sx={{
								width: "100%",
								backgroundColor: "background.default",
							}}
							showLabels
							value={tab}
							onChange={(event, newValue) => setTab(newValue)}>
							<BottomNavigationAction
								sx={{
									width: "50px",
								}}
								icon={<InfoRounded />}
								value="event info"
								label="Event info"
							/>
							<BottomNavigationAction
								icon={<FormatListNumberedRtlRounded />}
								label="Roster"
								value="roster"
							/>
							<BottomNavigationAction
								icon={<AudioFileRounded />}
								label="My audio"
								value="my audio"
							/>
						</BottomNavigation>
					</div>

					{tab === "event info" ? null : (
						<div className={styles.header_bumper} />
					)}

					{tab === "event info" ? (
						<>
							{eventInfo ? (
								<PerformerCurrentEventInfo eventInfo={eventInfo.event} />
							) : null}
						</>
					) : tab === "roster" ? (
						<>
							{eventInfo ? (
								<PerformerCurrentEventRoster
									myQueuePosition={eventInfo.my_cue_position}
									roster={eventInfo.roster}
								/>
							) : null}
						</>
					) : tab === "my audio" ? (
						<>
							{eventInfo ? (
								<div className={styles.audio_select_div}>
									<EventDateAudioSubmit
										refreshAudio={() => {
											refetch();
										}}
										specificEventId={specificEventIdFromParams}
										submittedAudio={eventInfo.submitted_audio}
										allowedLength={eventInfo.event.time_per_performer.toString()}
										tracksPerPerformer={1}
									/>
								</div>
							) : null}
						</>
					) : null}
				</div>
			)}
		</>
	);
}

export default PerformerCurrentEvent;
