/** @format */

import React from "react";
import styles from "./styles.module.css";
import { MusicOffRounded, AudioFileRounded } from "@mui/icons-material";

interface SubmittedAudioChipProps {
	hasAudio: boolean;
}

function SubmittedAudioChip({ hasAudio }: SubmittedAudioChipProps) {
	return (
		<div
			className={
				hasAudio
					? styles.submitted_audio_chip_yes
					: styles.submitted_audio_chip_no
			}>
			{hasAudio ? (
				<AudioFileRounded sx={{ marginRight: "5px" }} />
			) : (
				<MusicOffRounded />
			)}{" "}
			{hasAudio ? "Files Submitted" : "No Files Submitted"}
		</div>
	);
}

export default SubmittedAudioChip;
