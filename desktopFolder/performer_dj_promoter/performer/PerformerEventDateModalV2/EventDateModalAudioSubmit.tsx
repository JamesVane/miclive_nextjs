/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Divider } from "@mui/material";
import PerformerTicketSubmitAudioPaper from "../PerformerTicketSubmitAudioPaper";
import { setSelectFromExisting } from "@/store/performerSelectFromExistingModalSlice";
import { useDispatch, useSelector } from "react-redux";
import { setAddNewAudioToEvent } from "@/store/performerAddNewAudioToEventSlice";
import { DateModalStateType } from "./dateModalReducer";
import {
	formatMMSS,
	timeStringToSeconds,
} from "@/generic_functions/time_formaters";

interface EventDateModalAudioSubmitProps {
	specificEventId: number;
	submittedAudio: DateModalStateType["submitted_audio"];
	allowedLength: string;
	tracksPerPerformer: number;
}

function EventDateModalAudioSubmit({
	specificEventId,
	submittedAudio,
	allowedLength,
	tracksPerPerformer,
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

	return (
		<>
			<div className={styles.submitted_audio_header}>
				<div className={styles.submitted_title}>Submitted Audio Files</div>
				<div className={styles.audio_time_div}>
					{`Allowed Time: ${parsedAllowedTime} / Time Used: ${usedTime}`}
				</div>
				<div
					className={styles.divider_div}
					style={{ position: "absolute", bottom: "0px" }}>
					<Divider variant="middle" flexItem />
				</div>
			</div>
			<div className={styles.audio_scroll}>
				{Array.from({ length: tracksPerPerformer }, (_, index) => (
					<>
						{" "}
						{index === 0 ? null : (
							<PerformerTicketSubmitAudioPaper
								setSelectFromSongOpen={() => handleSetSelectFromSongOpen(index)}
								setAddNewOpen={() => handleAddNewOpen(index)}
								key={index}
								trackNumber={String(index)}
								payload={submittedAudio ? submittedAudio[index] : null}
							/>
						)}
					</>
				))}
			</div>
		</>
	);
}

export default EventDateModalAudioSubmit;
