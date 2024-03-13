/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Divider, IconButton, Button } from "@mui/material";
import PerformerTicketSubmitAudioPaper from "../PerformerTicketSubmitAudioPaper";
import { setSelectFromExisting } from "@/store/performerSelectFromExistingModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { setAddNewAudioToEvent } from "@/store/performerAddNewAudioToEventSlice";
import { DateModalStateType } from "./dateModalReducer";
import {
	formatMMSS,
	timeStringToSeconds,
} from "@/generic_functions/time_formaters";
import {
	CloseRounded,
	ArrowBackIosRounded,
	CheckRounded,
} from "@mui/icons-material";

interface EventDateModalAudioSubmitProps {
	specificEventId: number;
	submittedAudio: DateModalStateType["submitted_audio"];
	allowedLength: string;
	tracksPerPerformer: number;
	handleClose: () => void;
	handleBack: () => void;
}

function EventDateModalAudioSubmit({
	specificEventId,
	submittedAudio,
	allowedLength,
	tracksPerPerformer,
	handleClose,
	handleBack,
}: EventDateModalAudioSubmitProps) {
	const dispatch = useDispatch();

	function computeTotalSubmittedAudioTimeFromSubmittedAudio(): number {
		if (submittedAudio) {
			let total = 0;
			Object.values(submittedAudio).forEach((audio) => {
				total += audio.length;
			});
			return total;
		} else {
			return 0;
		}
	}

	const usedTime = formatMMSS(
		computeTotalSubmittedAudioTimeFromSubmittedAudio()
	);
	const parsedAllowedTime = formatMMSS(timeStringToSeconds(allowedLength));

	function handleSetSelectFromSongOpen(index: number) {
		if (submittedAudio) {
			dispatch(
				setSelectFromExisting({
					selectFromSongOpen: index,
					specificEventId: specificEventId,
					currentSongLength: submittedAudio[index]?.length,
					totalAudioLength: computeTotalSubmittedAudioTimeFromSubmittedAudio(),
					allowedLength: timeStringToSeconds(allowedLength),
				})
			);
		}
	}

	function handleAddNewOpen(index: number) {
		dispatch(
			setAddNewAudioToEvent({
				addNewOpen: index,
				specificEventId: specificEventId,
			})
		);
	}

	const audioIsSubmitted = submittedAudio ? submittedAudio[1] : null;

	return (
		<>
			<div className={styles.upload_audio_header}>
				<IconButton
					onClick={handleClose}
					color="secondary"
					sx={{
						height: "35px",
						width: "35px",
						marginRight: "5px",
						position: "absolute",
						right: "5px",
					}}>
					<CloseRounded sx={{ height: "35px", width: "35px" }} />
				</IconButton>
			</div>
			<div
				className={
					styles.allowed_time
				}>{`Allowed Time: ${parsedAllowedTime}`}</div>
			<PerformerTicketSubmitAudioPaper
				setSelectFromSongOpen={() => handleSetSelectFromSongOpen(1)}
				setAddNewOpen={() => handleAddNewOpen(1)}
				key={1}
				trackNumber={String(1)}
				payload={submittedAudio ? submittedAudio[1] : null}
			/>
			<Button
				sx={{
					marginTop: "10px",
				}}
				size="large"
				color={audioIsSubmitted ? "success" : "error"}
				variant="outlined"
				onClick={handleBack}
				startIcon={audioIsSubmitted ? <CheckRounded /> : <CloseRounded />}>
				{audioIsSubmitted ? "done" : "cancel"}
			</Button>
		</>
	);
}

export default EventDateModalAudioSubmit;
