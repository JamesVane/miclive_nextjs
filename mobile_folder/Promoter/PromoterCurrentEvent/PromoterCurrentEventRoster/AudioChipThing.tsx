/** @format */

import React from "react";
import styles from "./styles.module.css";
import { CheckRounded } from "@mui/icons-material";

interface AudioChipThingProps {
	hasAudio: boolean;
}

function AudioChipThing({ hasAudio }: AudioChipThingProps) {
	return (
		<div className={styles.roster_submitted_audio}>
			<div
				className={styles.roster_submitted_audio_decoration}
				style={{
					borderColor: hasAudio ? "#66bb69ff" : "#757575ff",
					color: hasAudio ? "#66bb69ff" : "#757575ff",
				}}>
				{hasAudio ? <CheckRounded color="success" /> : null}
				{hasAudio ? "Audio" : "No Audio"}
			</div>
		</div>
	);
}

export default AudioChipThing;
