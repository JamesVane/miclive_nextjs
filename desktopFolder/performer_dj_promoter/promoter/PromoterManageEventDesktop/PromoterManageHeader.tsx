/** @format */
"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import DividerH from "@/universalComponents/DividerH";
import { Button, Box, Avatar, IconButton } from "@mui/material";
import {
	HomeRounded,
	CampaignRounded,
	AddCircleRounded,
	MessageRounded,
	CoffeeRounded,
	TimelapseRounded,
	LocationOnRounded,
} from "@mui/icons-material";
import Image from "next/image";
import horizLogo from "@/images/miclive_svg_horiz.svg";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import { letterToHexcodeObject, TwoLetterKey } from "@/lettersToHexcodesObject";
import { useInterval } from "@/useInterval/useInterval";
import { useDispatch } from "react-redux";
import {
	setImtermissionTimestamp,
	setNextPerformer,
} from "@/store/PromoterManageEventState";
import { intermissionTimestampToMMSS } from "@/generic_functions/time_formaters";
import { formatTimeHour } from "@/generic_functions/date_formaters";

interface PromoterManageHeaderProps {
	setAddPerformerModalOpen: () => void;
	openAnnouncementMdal: () => void;
}

function PromoterManageHeader({
	setAddPerformerModalOpen,
	openAnnouncementMdal,
}: PromoterManageHeaderProps) {
	const router = useRouter();
	const dispatch = useDispatch();

	const {
		roster: rosterObject,
		event_cue_position: eventQueuePosition,
		intermission_timer_stamp: IntermissionTimestamp,
		has_ended: eventhasEnded,
		event_has_started: eventHasStarted,
		event,
	} = useSelector((state: RootState) => state.PromoterManageEventState);

	const {
		specific_event_id: specificEventId,
		event_name: eventName,
		base_event_id: baseEventId,
		start_time: startTime,
		location: { name: locationName },
	} = event;

	const [intermissionTime, setIntermissionTime] = useState(0);
	const [intermissionEndNextQueue, setIntermissionEndNextQueue] = useState(0);

	function handleSetIntermissionEndNextQueue(nextQueue: number) {
		if (intermissionEndNextQueue === 0) {
			setIntermissionEndNextQueue(nextQueue);
		}
	}

	useEffect(() => {
		if (intermissionEndNextQueue !== 0) {
			dispatch(setNextPerformer(intermissionEndNextQueue));
			dispatch(setImtermissionTimestamp(null));
		}
	}, [intermissionEndNextQueue]);

	const currentPerformerObject = rosterObject.checked_in[eventQueuePosition];

	const performerName = eventHasStarted
		? currentPerformerObject.performer_name ?? ""
		: "";

	const firstTwoLettersOfPerformerNameCapitolized =
		eventHasStarted && performerName[0]
			? ((performerName[0].toUpperCase() +
					performerName[1].toUpperCase()) as TwoLetterKey)
			: "";

	const noPicColor =
		firstTwoLettersOfPerformerNameCapitolized !== ""
			? letterToHexcodeObject[firstTwoLettersOfPerformerNameCapitolized]
			: "";

	function handleGoHome() {
		router.push("/promoter");
	}

	useEffect(() => {
		if (IntermissionTimestamp) {
			const endTime = new Date(IntermissionTimestamp).getTime();
			const now = new Date().getTime();
			const timeInSeconds = Math.max(Math.floor((endTime - now) / 1000), 0);

			console.log("INTERMISSION SET!!");
			setIntermissionTime(timeInSeconds);
		} else {
			setIntermissionTime(0);
		}
	}, [IntermissionTimestamp]);

	useInterval(
		() => {
			if (intermissionTime > 0) {
				setIntermissionTime((prevTime) => {
					console.log("prevTime:", prevTime);
					if (prevTime == 1) {
						handleSetIntermissionEndNextQueue(eventQueuePosition + 1);
						return 0; // reset time
					}
					return prevTime - 1;
				});
			}
		},
		intermissionTime > 0 ? 1000 : null
	);

	useEffect(() => {
		if (eventhasEnded) {
			router.push(`/promoter/event_ended/${specificEventId}`);
		}
	}, [eventhasEnded]);

	const intermissionInProgress = intermissionTime !== 0;

	return (
		<>
			<div className={styles.header_div}>
				<Button
					sx={{
						position: "absolute",
						top: "10px",
						left: "15px",
					}}
					onClick={handleGoHome}
					startIcon={<HomeRounded />}
					color="secondary"
					variant="outlined">
					home
				</Button>
				{eventHasStarted ? (
					<>
						<Box
							className={styles.current_performer_div}
							sx={{
								backgroundColor: intermissionInProgress
									? "warning.main"
									: "success.main",
							}}>
							{intermissionInProgress ? (
								<div className={styles.intermission_container}>
									<div className={styles.intermission_top}>
										Intermission In Progress
									</div>
									<div className={styles.intermission_bottom}>
										<CoffeeRounded
											sx={{
												marginLeft: "12px",
												color: "#0f0f0f",
												width: "75px",
												height: "75px",
											}}
										/>
										<div className={styles.intermission_timer_div}>
											{intermissionTimestampToMMSS(intermissionTime)}
										</div>
									</div>
								</div>
							) : (
								<>
									<div className={styles.current_performer_left}>
										{intermissionInProgress ? null : (
											<Box
												sx={{
													backgroundColor: "background.default",
													color: "success.main",
												}}
												className={styles.current_performer_box_text}>
												Current Performer
											</Box>
										)}
										<div className={styles.current_performer_chip}>
											<div className={styles.current_perf_pic}>
												<Avatar
													sx={{
														height: "65px",
														width: "65px",
														backgroundColor: noPicColor,
													}}>
													{currentPerformerObject.is_temp_account ? (
														firstTwoLettersOfPerformerNameCapitolized
													) : (
														<img
															src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/performer_pictures/performer_${currentPerformerObject.performer_id}.jpg`}
															style={{
																width: "100%",
																height: "100%",
															}}
														/>
													)}
												</Avatar>
											</div>
											<div className={styles.current_perf_chip_name_msg}>
												<div className={styles.current_perf_name}>
													{performerName}
												</div>
												<div className={styles.current_perf_msg}>
													<IconButton
														disabled={true}
														color="success"
														sx={{
															width: "35px",
															height: "35px",
															marginTop: "-2.5px",
															marginBottom: "-7.5px",
														}}>
														<MessageRounded />
													</IconButton>
												</div>
											</div>
										</div>
									</div>
									<div className={styles.current_performer_right}>
										{eventQueuePosition}
									</div>
								</>
							)}
						</Box>
					</>
				) : (
					<>
						<div className={styles.not_started_event_info_paper}>
							<div className={styles.event_not_started_pic}>
								<img
									src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${baseEventId}.jpg`}
									style={{
										height: "100%",
										width: "100%",
									}}
								/>
							</div>
							<div className={styles.not_started_into_right}>
								<div className={styles.not_started_event_name}>
									<div className={styles.elipses_text}>{eventName}</div>
								</div>
								<div className={styles.not_started_location}>
									<LocationOnRounded />
									<div className={styles.elipses_text}>{locationName}</div>
								</div>
							</div>
						</div>
						<div className={styles.posted_start_time}>
							<div className={styles.posted_start_time_lable}>
								Posted Start Time
							</div>
							<div className={styles.posted_start_time_bottom}>
								<TimelapseRounded
									sx={{
										height: "60px",
										width: "60px",
										marginLeft: "12px",
									}}
								/>
								<div className={styles.posted_start_time_baclground_div}>
									{formatTimeHour(startTime)}
								</div>
							</div>
						</div>
					</>
				)}
				<div
					className={styles.action_buttons_columns}
					style={{
						marginLeft: !eventHasStarted ? "15px" : "0px",
					}}>
					<Button
						onClick={openAnnouncementMdal}
						sx={{
							marginBottom: "2.5px",
						}}
						startIcon={<CampaignRounded />}
						variant="outlined">
						make announcement
					</Button>
					<Button
						color="info"
						onClick={setAddPerformerModalOpen}
						startIcon={<AddCircleRounded />}
						sx={{
							marginTop: "2.5px",
						}}
						variant="outlined">
						add walkin performer
					</Button>
				</div>
			</div>
			<DividerH />
		</>
	);
}

export default PromoterManageHeader;
