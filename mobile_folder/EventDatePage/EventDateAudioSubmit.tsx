/** @format */

import React from "react";
import styles from "./styles.module.css";
import EventDateSubmittedAudioPaper from "./EventDateSubmittedAudioPaper";
import { DateModalStateType } from "./EventDateReducer";
import { useDispatch } from "react-redux";
import {
	formatMMSS,
	timeStringToSeconds,
} from "@/generic_functions/time_formaters";
import { setSelectFromExisting } from "@/store/performerSelectFromExistingModalSlice";
import { setAddNewAudioToEvent } from "@/store/performerAddNewAudioToEventSlice";
import DividerH from "@/universalComponents/DividerH";

interface EventDateAudioSubmitProps {
	specificEventId: number;
	submittedAudio: DateModalStateType["submitted_audio"];
	allowedLength: string;
	tracksPerPerformer: number;
}

function EventDateAudioSubmit({
	specificEventId,
	submittedAudio,
	allowedLength,
	tracksPerPerformer,
}: EventDateAudioSubmitProps) {
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

	function handleAddNewOpen(index: number) {
		dispatch(
			setAddNewAudioToEvent({
				addNewOpen: index,
				specificEventId: specificEventId,
			})
		);
	}

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

	return (
		<div className={styles.audio_main_div}>
			<div className={styles.audio_time}>
				Time Used:
				<div className={styles.time_used_deco}>
					<div className={styles.primary_color}>{usedTime}</div>/
					<div className={styles.secondary_color}>{parsedAllowedTime}</div>
				</div>
			</div>
			<DividerH />
			{Array.from({ length: tracksPerPerformer }, (_, index) => (
				<>
					<EventDateSubmittedAudioPaper
						setSelectFromSongOpen={() => handleSetSelectFromSongOpen(index)}
						setAddNewOpen={() => handleAddNewOpen(index)}
						key={index}
						trackNumber={String(index)}
						payload={submittedAudio ? submittedAudio[index] : null}
					/>
				</>
			))}
		</div>
	);
}

export default EventDateAudioSubmit;
