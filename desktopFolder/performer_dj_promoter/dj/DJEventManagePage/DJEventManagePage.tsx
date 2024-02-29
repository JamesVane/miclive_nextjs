/** @format */

import { useState } from "react";
import { Box, Button, Tabs, Tab, LinearProgress } from "@mui/material";
import PerformerCueHelper from "./PerformerCueHelper";
import {
	formatDateString,
	formatTimeHour,
} from "@/generic_functions/date_formaters";
import { RootState } from "@/app/LocalizationProviderHelper";
import { useSelector, useDispatch } from "react-redux";
import { putDjNextPerformer } from "@/api_functions/putDjNextPerformer";
import { putSwitchPerformerCuePosition } from "@/api_functions/putSwitchPerformerCuePosition";
import { getDjManageFullState } from "@/api_functions/getDjManageFullState";
import AvatarSimple from "@desk/AvatarSimple";
import {
	setAllDjManageEventSlice,
	swapPerformerCuePositionReducer,
} from "@/store/djManageEventSlice";
import {
	SwapVertRounded,
	StopCircleRounded,
	SkipNextRounded,
	CalendarMonthRounded,
	FreeBreakfastRounded,
	MessageRounded,
	AccessTimeRounded,
	CloseRounded,
	CampaignRounded,
	DownloadRounded,
} from "@mui/icons-material";
import HomeBarV2 from "@desk/HomeBarV2";
import styles from "./styles.module.css";
import DividerH from "@/universalComponents/DividerH";

function DJEventManagePage() {
	const dispatch = useDispatch();
	const [nextPerformerLoading, setNextPerformerLoading] = useState(false);
	const [swappingInProgress, setSwappingInProgress] = useState(false);
	const [isSwappingWNumTwo, setIsSwappingWNumTwo] = useState(false);
	const [selectedQueue, setSelectedQueue] = useState<
		"not checked" | "has performed" | "queue"
	>("queue");
	const {
		start_time,
		end_time,
		base_event,
		specific_event_id,
		event_cue_position,
		not_checked_in,
		checked_in,
		has_performed,
		event_name,
		event_tagline,
	} = useSelector((state: RootState) => state.djManageEvent);

	function nextPerformer() {
		setNextPerformerLoading(true);
		putDjNextPerformer(specific_event_id, event_cue_position + 1).finally(
			() => {
				getDjManageFullState(specific_event_id.toString()).then((response) => {
					dispatch(setAllDjManageEventSlice(response));
					setNextPerformerLoading(false);
				});
			}
		);
	}

	function swapWith2() {
		setIsSwappingWNumTwo(true);
		setSwappingInProgress(true);
		const thisCuePosition = event_cue_position;
		const targetCuePosition = thisCuePosition + 1;
		const thisPerformerObject = checked_in[thisCuePosition];
		const targetPerformerObject = checked_in[targetCuePosition];
		try {
			putSwitchPerformerCuePosition({
				query_performer_id: thisPerformerObject.performer_id,
				query_specific_event: specific_event_id,
				query_cue_position: targetCuePosition,
			}).then((response: any) => {
				console.log(response);
				putSwitchPerformerCuePosition({
					query_performer_id: targetPerformerObject.performer_id,
					query_specific_event: specific_event_id,
					query_cue_position: thisCuePosition,
				}).then((response: any) => {
					console.log(response);

					dispatch(
						swapPerformerCuePositionReducer({
							thisCuePosition: thisCuePosition,
							targetCuePosition: targetCuePosition,
						})
					);
					setIsSwappingWNumTwo(false);
					setSwappingInProgress(false);
				});
			});
		} catch (error) {
			setIsSwappingWNumTwo(false);
			setSwappingInProgress(false);
			console.log("swap request error: ", error);
		}
	}
	const currentPerformer = checked_in[event_cue_position];

	return (
		<div className={styles.main_div}>
			<HomeBarV2 hasProfile>
				<Button
					color="warning"
					startIcon={<CloseRounded />}
					variant="outlined"
					size="large"
					sx={{ position: "absolute", left: "250px" }}>
					exit
				</Button>
			</HomeBarV2>
			<div className={styles.side_paper}>
				<div className={styles.current_performer_title}>
					Current Performer:
					<div className={styles.queue_pos_deco}>{event_cue_position}</div>
				</div>
				<DividerH />
				<div className={styles.current_performer_div}>
					<div className={styles.current_performer_pic}>
						<AvatarSimple
							ninety
							type="performer"
							id={currentPerformer.performer_id}
						/>
					</div>
					<div className={styles.current_performer_right}>
						<div className={styles.current_performer_name}>
							{currentPerformer.performer_name}
						</div>
						<div className={styles.current_performer_tagline}>
							{currentPerformer.performer_tagline}
						</div>
					</div>
				</div>
				<div className={styles.reco_time_div}>
					<div className={styles.reco_time_decor}>
						<div className={styles.recomended_time_text}>Performer Time:</div>
						<DividerH />
						<div className={styles.reco_time_clock}>00:00</div>
					</div>
				</div>
				<Button
					variant="outlined"
					sx={{
						width: "95%",
						fontSize: "25px",
						height: "65px",
						marginTop: "25px",
					}}
					startIcon={<MessageRounded sx={{ height: "31px", width: "31px" }} />}>
					Message
				</Button>
				<Button
					disabled={nextPerformerLoading || swappingInProgress}
					color="success"
					variant="outlined"
					sx={{
						width: "95%",
						fontSize: "25px",
						height: "65px",
						marginTop: "25px",
					}}
					startIcon={
						<DownloadRounded sx={{ height: "31px", width: "31px" }} />
					}>
					download audio
				</Button>
				<Button
					onClick={swapWith2}
					disabled={nextPerformerLoading || swappingInProgress}
					color="warning"
					variant="outlined"
					sx={{
						width: "95%",
						fontSize: "25px",
						height: "65px",
						marginTop: "25px",
						position: "relative",
						overflow: "hidden",
					}}
					startIcon={
						<SwapVertRounded sx={{ height: "31px", width: "31px" }} />
					}>
					{isSwappingWNumTwo ? (
						<LinearProgress
							color="warning"
							sx={{ width: "100%", position: "absolute", bottom: "0px" }}
						/>
					) : null}
					move down queue
				</Button>
				<Button
					disabled={nextPerformerLoading || swappingInProgress}
					onClick={nextPerformer}
					sx={{
						width: "95%",
						fontSize: "25px",
						height: "65px",
						marginTop: "20px",
						position: "relative",
						overflow: "hidden",
					}}
					color="success"
					variant="outlined"
					startIcon={
						<SkipNextRounded sx={{ height: "37px", width: "37px" }} />
					}>
					{nextPerformerLoading ? (
						<LinearProgress
							color="success"
							sx={{ width: "100%", position: "absolute", bottom: "0px" }}
						/>
					) : null}
					next performer
				</Button>
			</div>
			<div className={styles.center_paper}>
				<Tabs
					value={selectedQueue}
					onChange={(event, newValue) => setSelectedQueue(newValue)}
					sx={{ width: "100%", backgroundColor: "rgba(0, 0, 0, 0.4)" }}
					aria-label="basic tabs example">
					<Tab
						label="Not Checked In"
						value="not checked"
						sx={{ width: "33%" }}
					/>
					<Tab label="queue" value="queue" sx={{ width: "34%" }} />
					<Tab
						label="already performed"
						value="has performed"
						sx={{ width: "33%" }}
					/>
				</Tabs>
				<Box className={styles.cue_wrapper}>
					<PerformerCueHelper
						setSwappingInProgress={setSwappingInProgress}
						swappingInProgress={swappingInProgress}
						nextPerformerLoading={nextPerformerLoading}
						cueType={selectedQueue}
						checked_in={checked_in}
						not_checked_in={not_checked_in}
						has_performed={has_performed}
					/>
				</Box>
			</div>
			<div className={styles.side_paper}>
				<div className={styles.event_name_pic_div}>
					<div className={styles.event_pic_div}>
						<div className={styles.event_pic_decoration}>
							<img
								src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${base_event}.jpg`}
								style={{
									width: "100%",
									height: "100%",
								}}
							/>
						</div>
					</div>
					<div className={styles.event_name_tagline}>
						<div className={styles.event_name}>{event_name}</div>
						<div className={styles.event_tagline}>{event_tagline}</div>
					</div>
				</div>
				<DividerH />
				<div className={styles.time_date_div} style={{ marginTop: "10px" }}>
					<CalendarMonthRounded sx={{ marginRight: "5px" }} />
					{formatDateString(start_time)}
				</div>
				<div className={styles.time_date_div}>
					<AccessTimeRounded sx={{ marginRight: "5px" }} />
					{`${formatTimeHour(start_time)} - ${formatTimeHour(end_time)}`}
				</div>
				<div className={styles.time_remaining_container}>
					<div className={styles.time_remaining_decoraiton}>
						<div className={styles.time_title_div}>Time Remaining:</div>
						<DividerH />
						<div className={styles.time_remaining_clock}>00:00:00</div>
					</div>
				</div>
				<Button
					sx={{
						width: "95%",
						fontSize: "25px",
						height: "65px",
						marginTop: "20px",
					}}
					variant="outlined"
					startIcon={
						<CampaignRounded sx={{ height: "37px", width: "37px" }} />
					}>
					announcement
				</Button>
				<Button
					sx={{
						width: "95%",
						fontSize: "25px",
						height: "65px",
						marginTop: "25px",
					}}
					color="warning"
					variant="outlined"
					startIcon={
						<FreeBreakfastRounded sx={{ height: "31px", width: "31px" }} />
					}>
					start intermission
				</Button>
				<Button
					sx={{
						width: "95%",
						fontSize: "25px",
						height: "65px",
						marginTop: "25px",
					}}
					color="error"
					variant="outlined"
					startIcon={
						<StopCircleRounded sx={{ height: "31px", width: "31px" }} />
					}>
					end event
				</Button>
			</div>
		</div>
	);
}

export default DJEventManagePage;
