/** @format */

import S3PlaybackWrapper from "@/audioComponents/S3PlaybackWrapper";
import React from "react";
import { Button } from "@mui/material";

interface PerformerTicketAudioSelectRow {
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

function PerformerTicketAudioSelectRow({
	audioKey,
	selectExistingAudio,
	isTooLong,
}: PerformerTicketAudioSelectRow) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "row",
				width: "100%",
				height: "100px",
				minHeight: "100px",
				borderBottom: "2px solid #edefeaff",
			}}>
			<div
				style={{
					height: "100%",
					display: "flex",
					flex: 1,
					flexDirection: "column",
				}}>
				<div
					style={{
						width: "100%",
						height: "50%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}>
					{audioKey.name}
				</div>
				<S3PlaybackWrapper
					audioId={audioKey.audio_id.toString()}
					performerId={audioKey.performer_id.toString()}
				/>
			</div>
			<div
				style={{
					display: "flex",
					width: "100px",
					height: "100px",
					alignItems: "center",
					justifyContent: "center",
				}}>
				<Button
					onClick={() => {
						selectExistingAudio(audioKey);
					}}
					color="success"
					variant="contained"
					disabled={isTooLong}
					sx={{ width: "80%", height: "80%" }}>
					{isTooLong ? "too long" : "select"}
				</Button>
			</div>
		</div>
	);
}

export default PerformerTicketAudioSelectRow;
