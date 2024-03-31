/** @format */

import { useEffect } from "react";
import { Button, ButtonGroup, LinearProgress } from "@mui/material";
import {
	ArrowUpwardRounded,
	ArrowDownwardRounded,
	MessageRounded,
	FileDownloadOffRounded,
	DownloadRounded,
} from "@mui/icons-material";
import { useState } from "react";
import { swapPerformerCuePositionReducer } from "@/store/djManageEventSlice";
import { RootState } from "@/app/LocalizationProviderHelper";
import { putSwitchPerformerCuePosition } from "@/api_functions_not_user/putSwitchPerformerCuePosition";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles.module.css";
import _ from "lodash";
import AvatarSimple from "@desk/AvatarSimple";
import DividerH from "@/universalComponents/DividerH";

interface Props {
	displayPosition: number;
	performerCue: number;
	nextPerformerLoading: boolean;
	setSwappingInProgress: React.Dispatch<React.SetStateAction<boolean>>;
	swappingInProgress: boolean;
	isLast: boolean;
}

function PerformerInCheckedInCueComponent({
	displayPosition,
	performerCue,
	nextPerformerLoading,
	setSwappingInProgress,
	isLast,
	swappingInProgress,
}: Props) {
	const dispatch = useDispatch();
	const { checked_in, specific_event_id } = useSelector(
		(state: RootState) => state.djManageEvent
	);
	const performerObject = checked_in[performerCue];

	const [hasDownloaded, setHasDownloaded] = useState(false);
	const [upArrowLoading, setUpLoading] = useState(false);
	const [downArrowLoading, setDownLoading] = useState(false);

	const hasAudio =
		Object.keys(performerObject.submitted_audio).length === 0 ? false : true;

	function swapCuePosition(direction: "up" | "down") {
		setSwappingInProgress(true);
		const thisCuePosition = performerCue;
		const targetCuePosition =
			direction === "up" ? performerCue - 1 : performerCue + 1;
		const thisPerformerObject = checked_in[thisCuePosition];
		const targetPerformerObject = checked_in[targetCuePosition];
		if (targetCuePosition === 0) {
			return;
		} else if (checked_in[thisCuePosition] && checked_in[targetCuePosition]) {
			try {
				putSwitchPerformerCuePosition({
					query_performer_id: thisPerformerObject.performer_id,
					query_specific_event: specific_event_id,
					query_cue_position: targetCuePosition,
				}).then((response) => {
					console.log(response);
					putSwitchPerformerCuePosition({
						query_performer_id: targetPerformerObject.performer_id,
						query_specific_event: specific_event_id,
						query_cue_position: thisCuePosition,
					}).then((response) => {
						console.log(response);

						dispatch(
							swapPerformerCuePositionReducer({
								thisCuePosition: thisCuePosition,
								targetCuePosition: targetCuePosition,
							})
						);
						setSwappingInProgress(false);
					});
				});
			} catch (error) {
				setSwappingInProgress(false);
				console.log("swap request error: ", error);
			}
		} else {
			setSwappingInProgress(false);
			console.log("problem");
			return;
		}
	}

	useEffect(() => {
		if (upArrowLoading) {
			setUpLoading(false);
		}
		if (downArrowLoading) {
			setDownLoading(false);
		}
	}, [swappingInProgress]);

	const disabledFromNextPerformer =
		(displayPosition === 1 || displayPosition === 2) && nextPerformerLoading;

	return (
		<>
			{performerObject.performer_name === "Event Not Started" ? null : (
				<>
					<div className={styles.roster_person_div}>
						<div className={styles.person_pic_div}>
							<AvatarSimple
								username={performerObject.performer_name}
								ninety
								type="performer"
								id={performerObject.performer_id}
							/>
						</div>
						<div className={styles.person_row_middle}>
							<div className={styles.performer_name}>
								{performerObject.performer_name}
							</div>
							<div className={styles.performer_buttons}>
								<Button startIcon={<MessageRounded />} variant="outlined">
									message
								</Button>
								<Button
									disabled={!hasAudio}
									color={hasDownloaded ? "success" : "primary"}
									onClick={() => setHasDownloaded(true)}
									sx={{ marginLeft: "10px" }}
									startIcon={
										hasAudio ? <DownloadRounded /> : <FileDownloadOffRounded />
									}
									variant="outlined">
									{hasAudio
										? hasDownloaded
											? "download again"
											: "download audio"
										: "no audio submitted"}
								</Button>
							</div>
							{isLast ? (
								<div className={styles.single_button_up}>
									<Button
										disabled={disabledFromNextPerformer || swappingInProgress}
										sx={{
											height: "50%",
											position: "relative",
											overflow: "hidden",
										}}
										variant="outlined"
										onClick={() => {
											setUpLoading(true);
											swapCuePosition("up");
										}}>
										<ArrowUpwardRounded
											sx={{ height: "40px", width: "40px" }}
										/>
										{upArrowLoading ? (
											<LinearProgress
												sx={{
													position: "absolute",
													bottom: "0px",
													width: "100%",
												}}
											/>
										) : null}
									</Button>
								</div>
							) : displayPosition === 1 ? (
								<div className={styles.single_button}>
									<Button
										disabled={disabledFromNextPerformer || swappingInProgress}
										sx={{
											height: "50%",
											position: "relative",
											overflow: "hidden",
										}}
										variant="outlined"
										onClick={() => {
											setDownLoading(true);
											swapCuePosition("down");
										}}>
										<ArrowDownwardRounded
											sx={{ height: "40px", width: "40px" }}
										/>
										{downArrowLoading ? (
											<LinearProgress
												sx={{
													position: "absolute",
													bottom: "0px",
													width: "100%",
												}}
											/>
										) : null}
									</Button>
								</div>
							) : (
								<ButtonGroup
									disabled={disabledFromNextPerformer || swappingInProgress}
									sx={{
										position: "absolute",
										right: "10px",
										height: "85%",
										width: "70px",
									}}
									orientation="vertical">
									<Button
										sx={{
											height: "50%",
											position: "relative",
											overflow: "hidden",
										}}
										onClick={() => {
											setUpLoading(true);
											swapCuePosition("up");
										}}>
										<ArrowUpwardRounded
											sx={{ height: "40px", width: "40px" }}
										/>
										{upArrowLoading ? (
											<LinearProgress
												sx={{
													position: "absolute",
													bottom: "0px",
													width: "100%",
												}}
											/>
										) : null}
									</Button>
									<Button
										sx={{
											height: "50%",
											position: "relative",
											overflow: "hidden",
										}}
										onClick={() => {
											setDownLoading(true);
											swapCuePosition("down");
										}}>
										<ArrowDownwardRounded
											sx={{ height: "40px", width: "40px" }}
										/>
										{downArrowLoading ? (
											<LinearProgress
												sx={{
													position: "absolute",
													bottom: "0px",
													width: "100%",
												}}
											/>
										) : null}
									</Button>
								</ButtonGroup>
							)}
						</div>
						<div className={styles.person_row_right}>
							<div className={styles.queue_pos_deco}>
								{performerObject.cue_position}
							</div>
						</div>
					</div>
					<DividerH />
				</>
			)}
		</>
	);
}

export default PerformerInCheckedInCueComponent;
