/** @format */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import {
	setSelectFromExisting,
	defaultPerformerSelectFromExistingModal,
} from "@/store/performerSelectFromExistingModalSlice";
import PerformerTicketAudioSelectModalMobile from "./PerformerTicketAudioSelectModalMobile";
import styles from "./styles.module.css";
import { Box } from "@mui/material";

interface PerformerSelectFromExistingModalMobileProps {
	refreshAudio: () => void;
}

function PerformerSelectFromExistingModalMobile({
	refreshAudio,
}: PerformerSelectFromExistingModalMobileProps) {
	const dispatch = useDispatch();
	const {
		selectFromSongOpen,
		specificEventId,
		currentSongLength,
		totalAudioLength,
		allowedLength,
	} = useSelector((state: RootState) => state.performerSelectFromExistingModal);

	function handleClose() {
		dispatch(setSelectFromExisting(defaultPerformerSelectFromExistingModal));
		refreshAudio();
	}

	function handleClickOutside(
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) {
		event.stopPropagation();
		handleClose();
	}

	function handleClickInside(
		event: React.MouseEvent<HTMLDivElement, MouseEvent>
	) {
		event.stopPropagation();
	}

	return (
		<>
			{selectFromSongOpen !== 0 ? (
				<Box className={styles.audio_paper_div} onClick={handleClickInside}>
					<PerformerTicketAudioSelectModalMobile
						specificEventId={specificEventId}
						currentSongLength={currentSongLength}
						totalAudioLength={totalAudioLength}
						setSelectFromSongOpen={handleClose}
						selectFromSongOpen={selectFromSongOpen}
						allowedLength={allowedLength}
					/>
				</Box>
			) : null}
		</>
	);
}

export default PerformerSelectFromExistingModalMobile;
