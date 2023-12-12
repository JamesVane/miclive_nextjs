/** @format */

import { useState } from "react";
import S3PlaybackWrapper from "@/audioComponents/S3PlaybackWrapper";
import styles from "./styles.module.css";
import { AddRounded, QueueMusicRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import DividerH from "@/universalComponents/DividerH";

interface PerformerTicketSubmitAudioPaperProps {
	payload: { audioName: string; audioKey: string; length: number } | null;
	trackNumber: string;
	setSelectFromSongOpen: (index: number) => void;
	setAddNewOpen: (index: number) => void;
}

function PerformerTicketSubmitAudioPaper({
	setSelectFromSongOpen,
	payload,
	setAddNewOpen,
	trackNumber,
}: PerformerTicketSubmitAudioPaperProps) {
	function AudioComponent({
		premadePath,
		audioName,
	}: {
		premadePath: string;
		audioName: string;
	}) {
		const [buttonHover, setButtonHover] = useState(false);
		const [forkOpen, setForkOpen] = useState(false);
		return (
			<>
				<div
					className={styles.top_div}
					style={{
						backgroundColor: forkOpen
							? "rgba(100, 100, 100, .1)"
							: "transparent",
					}}>
					<div className={styles.number_50px}>
						<div className={styles.number_deco}>{trackNumber}</div>
					</div>
					<div className={styles.name_button_div}>
						<div className={styles.name_container}>
							<div className={styles.elipse_text}>
								{forkOpen ? "Change Audio File" : audioName}
							</div>
						</div>
						<div className={styles.change_button}>
							<Button
								onClick={() => setForkOpen(forkOpen ? false : true)}
								variant="outlined">
								{forkOpen ? "cancel" : "change"}
							</Button>
						</div>
					</div>
				</div>
				<DividerH />
				<div className={styles.player_wrapper}>
					{forkOpen ? (
						<>
							<Button
								startIcon={<QueueMusicRounded />}
								onClick={() => setSelectFromSongOpen(Number(trackNumber))}
								variant="outlined">
								{"Select From my songs"}
							</Button>
							<Button
								onClick={() => setAddNewOpen(Number(trackNumber))}
								startIcon={<AddRounded />}
								color="success"
								variant="outlined">
								add new audio
							</Button>
						</>
					) : (
						<S3PlaybackWrapper premadePath={premadePath} />
					)}
				</div>
			</>
		);
	}

	function NeedsAudioComponent() {
		return (
			<>
				<div className={styles.top_div}>
					<div className={styles.number_50px}>
						<div className={styles.number_deco}>{trackNumber}</div>
					</div>
					<div className={styles.upload_audio_div}>
						<div className={styles.name_container}>
							<div className={styles.elipse_text}>Upload Audio File</div>
						</div>
						<div className={styles.change_button}></div>
					</div>
				</div>
				<DividerH />
				<div className={styles.player_wrapper}>
					<Button
						startIcon={<QueueMusicRounded />}
						onClick={() => setSelectFromSongOpen(Number(trackNumber))}
						variant="outlined">
						{"Select From my songs"}
					</Button>
					<Button
						onClick={() => setAddNewOpen(Number(trackNumber))}
						startIcon={<AddRounded />}
						color="success"
						variant="outlined">
						add new audio
					</Button>
				</div>
			</>
		);
	}

	return (
		<div className={styles.main_wrapper}>
			{payload ? (
				<AudioComponent
					premadePath={payload["audioKey"]}
					audioName={payload["audioName"]}
				/>
			) : (
				<NeedsAudioComponent />
			)}
		</div>
	);
}

export default PerformerTicketSubmitAudioPaper;
