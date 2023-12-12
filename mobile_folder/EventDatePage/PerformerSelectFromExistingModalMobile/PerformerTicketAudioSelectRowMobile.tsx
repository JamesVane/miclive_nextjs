/** @format */

import S3PlaybackWrapper from "@/audioComponents/S3PlaybackWrapper";
import React from "react";
import { Button, Divider } from "@mui/material";
import styles from "./styles.module.css";

interface PerformerTicketAudioSelectRowMobileProps {
	audioKey: {
		audio_id: number;
		name: string;
		audio_length: string;
		performer_id: number;
	};
	selectExistingAudio: (audioKey: {
		audio_id: number;
		name: string;
		audio_length: string;
		performer_id: number;
	}) => void;
	isTooLong: boolean;
}

function PerformerTicketAudioSelectRowMobile({
	audioKey,
	selectExistingAudio,
	isTooLong,
}: PerformerTicketAudioSelectRowMobileProps) {
	return (
		<div className={styles.audio_row_main}>
			<div className={styles.audio_top}>
				<div className={styles.audio_name}>
					<div className={styles.elipse_text}>{audioKey.name}</div>
				</div>
				<div className={styles.select_button}>
					<Button
						onClick={() => {
							selectExistingAudio(audioKey);
						}}
						color="success"
						variant="outlined"
						disabled={isTooLong}>
						{isTooLong ? "too long" : "select"}
					</Button>
				</div>
			</div>
			<div className={styles.audio_bottom}>
				<S3PlaybackWrapper
					audioId={audioKey.audio_id.toString()}
					performerId={audioKey.performer_id.toString()}
				/>
			</div>
		</div>
	);
}

export default PerformerTicketAudioSelectRowMobile;
