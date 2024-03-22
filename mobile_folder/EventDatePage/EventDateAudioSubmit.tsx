/** @format */

import React from "react";
import styles from "./styles.module.css";
import EventDateSubmittedAudioPaper from "./EventDateSubmittedAudioPaper";
import { DateModalStateType } from "./EventDateReducer";
import { useDispatch, useSelector } from "react-redux";
import {
	formatMMSS,
	timeStringToSeconds,
} from "@/generic_functions/time_formaters";
import { setSelectFromExisting } from "@/store/performerSelectFromExistingModalSlice";
import { setAddNewAudioToEvent } from "@/store/performerAddNewAudioToEventSlice";
import DividerH from "@/universalComponents/DividerH";
import PerformerSelectFromExistingModalMobile from "./PerformerSelectFromExistingModalMobile";
import PerformerAddNewAudioToEventModal from "./PerformerAddNewAudioToEventModal";
import { RootState } from "@/app/LocalizationProviderHelper";
import { Button } from "@mui/material";
import { CheckRounded } from "@mui/icons-material";

interface EventDateAudioSubmitProps {
	specificEventId: number;
	submittedAudio: DateModalStateType["submitted_audio"];
	allowedLength: string;
	tracksPerPerformer: number;
	refreshAudio: () => void;
	hasDoneButton?: boolean;
	handleDone?: () => void;
}

function EventDateAudioSubmit({
	specificEventId,
	submittedAudio,
	allowedLength,
	tracksPerPerformer,
	refreshAudio,
	hasDoneButton,
	handleDone,
}: EventDateAudioSubmitProps) {
	const dispatch = useDispatch();

	const { selectFromSongOpen } = useSelector(
		(state: RootState) => state.performerSelectFromExistingModal
	);

	const { addNewOpen } = useSelector(
		(state: RootState) => state.performerAddNewAudioToEvent
	);

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
		<>
			<PerformerSelectFromExistingModalMobile
				refreshAudio={() => refreshAudio()}
			/>
			<PerformerAddNewAudioToEventModal
				notAModal
				refreshAudio={() => refreshAudio()}
			/>
			{selectFromSongOpen === 0 && !addNewOpen ? (
				<div className={styles.audio_main_div}>
					<div className={styles.audio_time}>
						Time Used:
						<div className={styles.time_used_deco}>
							<div className={styles.primary_color}>{usedTime}</div>/
							<div className={styles.secondary_color}>{parsedAllowedTime}</div>
						</div>
					</div>
					<DividerH />
					<EventDateSubmittedAudioPaper
						setSelectFromSongOpen={() => handleSetSelectFromSongOpen(1)}
						setAddNewOpen={() => handleAddNewOpen(1)}
						key={1}
						trackNumber={String(1)}
						payload={submittedAudio ? submittedAudio[1] : null}
					/>
					{hasDoneButton && submittedAudio && submittedAudio[1] ? (
						<Button
							startIcon={<CheckRounded />}
							size="large"
							color="success"
							variant="outlined"
							onClick={handleDone}>
							Done
						</Button>
					) : null}
				</div>
			) : null}
		</>
	);
}

export default EventDateAudioSubmit;
