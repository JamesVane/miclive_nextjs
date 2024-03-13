/** @format */

import { useState } from "react";
import { AddRounded, QueueMusicRounded } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import styles from "./styles.module.css";
import S3PlaybackWrapper from "@/audioComponents/S3PlaybackWrapper";

interface EventDateSubmittedAudioPaperProps {
	payload: { audioName: string; audioKey: string; length: number } | null;
	trackNumber: string;
	setSelectFromSongOpen: (index: number) => void;
	setAddNewOpen: (index: number) => void;
}

function EventDateSubmittedAudioPaper({
	setSelectFromSongOpen,
	payload,
	setAddNewOpen,
	trackNumber,
}: EventDateSubmittedAudioPaperProps) {
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
					className={styles.audio_row_top_div}
					style={{
						backgroundColor: forkOpen
							? "rgba(100, 100, 100, .1)"
							: "transparent",
					}}>
					<div className={styles.audio_name_button_div}>
						<div className={styles.audio_name_container}>
							<div className={styles.elipse_text}>
								{forkOpen ? "Change Audio File" : audioName}
							</div>
						</div>
						<div className={styles.change_button}>
							<Button
								color="secondary"
								size="small"
								onClick={() => setForkOpen(forkOpen ? false : true)}
								variant="outlined">
								{forkOpen ? "cancel" : "change"}
							</Button>
						</div>
					</div>
				</div>
				<div className={styles.divider_div}>
					<Divider variant="middle" flexItem />
				</div>
				<div className={styles.player_wrapper}>
					{forkOpen ? (
						<>
							<Button
								size="small"
								startIcon={<QueueMusicRounded />}
								onClick={() => setSelectFromSongOpen(Number(trackNumber))}
								variant="outlined">
								{"Select From my songs"}
							</Button>
							<Button
								size="small"
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
				<div className={styles.audio_row_top_div}>
					<div className={styles.upload_audio_div}>
						<div className={styles.audio_name_container}>
							<div className={styles.elipse_text}>Upload Audio File</div>
						</div>
						<div className={styles.change_button}></div>
					</div>
				</div>
				<div className={styles.divider_div}>
					<Divider variant="middle" flexItem />
				</div>
				<div className={styles.player_wrapper}>
					<Button
						size="small"
						startIcon={<QueueMusicRounded />}
						onClick={() => setSelectFromSongOpen(Number(trackNumber))}
						variant="outlined">
						{"Select From my songs"}
					</Button>
					<Button
						size="small"
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
		<div className={styles.audio_main_wrapper}>
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

export default EventDateSubmittedAudioPaper;
