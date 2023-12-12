/** @format */

import S3PlaybackWrapper from "@/audioComponents/S3PlaybackWrapper";
import styles from "./styles.module.css";
import { Button, Divider, LinearProgress } from "@mui/material";
import { useState } from "react";
import { getPerformerProfileAudioKeys } from "@/api_functions/getPerformerProfileAudioKeys";
import { useDispatch } from "react-redux";
import { setPerformerAudioKey } from "@/store/performerAudioKeysStore";
import { postRemoveAudioFromSaved } from "@/api_functions/postRemoveAudioFromSaved";
import {
	RemoveCircleRounded,
	DeleteForeverRounded,
	CloseRounded,
} from "@mui/icons-material";

interface PerformerProfileAudioPaperProps {
	audioKey: {
		audio_id: number;
		name: string;
		audio_length: string;
		performer_id: number;
		isInUse: boolean;
	};
}

function PerformerProfileAudioPaper({
	audioKey,
}: PerformerProfileAudioPaperProps) {
	const [confirmDelete, setConfirmDelete] = useState(false);
	const [isDeleted, setIsDeleted] = useState(false);
	const [removButtonHover, setRemoveButtonHover] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const dispatch = useDispatch();

	async function refreshAudioKeys() {
		const performerId = audioKey.performer_id.toString();

		const audioKeysNew = await getPerformerProfileAudioKeys(performerId);
		dispatch(setPerformerAudioKey(audioKeysNew));
	}

	async function removeAudio() {
		setIsDeleting(true);
		await postRemoveAudioFromSaved(
			audioKey.audio_id,
			audioKey.performer_id
		).then(() => {
			refreshAudioKeys();
			setIsDeleting(false);
		});

		setConfirmDelete(false);
		setIsDeleted(true);
	}

	return (
		<div
			className={styles.main_div}
			style={{ display: isDeleted ? "none" : "flex" }}>
			{confirmDelete ? (
				<div className={styles.modal}>
					<div className={styles.name_div}>{audioKey.name}</div>
					<div className={styles.divider_div}>
						<Divider variant="middle" flexItem />
					</div>
					<div className={styles.remove_buttons}>
						<Button
							disabled={isDeleting}
							startIcon={<CloseRounded />}
							onClick={() => setConfirmDelete(false)}
							variant="outlined"
							color="secondary"
							sx={{ margin: "5px" }}>
							cancel
						</Button>
						<Button
							disabled={isDeleting}
							startIcon={<DeleteForeverRounded />}
							onClick={removeAudio}
							variant="outlined"
							color="error"
							sx={{ margin: "5px", position: "relative", overflow: "hidden" }}>
							remove
							{isDeleting ? (
								<LinearProgress
									color="error"
									sx={{ width: "100%", position: "absolute", bottom: "0px" }}
								/>
							) : null}
						</Button>
					</div>
				</div>
			) : null}
			<Button
				onMouseEnter={() => setRemoveButtonHover(true)}
				onMouseLeave={() => setRemoveButtonHover(false)}
				endIcon={<RemoveCircleRounded />}
				onClick={() => setConfirmDelete(true)}
				sx={{
					position: "absolute",
					top: "10px",
					right: "5px",
				}}
				variant="outlined"
				color="warning"
				size="small"
				disabled={audioKey.isInUse}>
				{audioKey.isInUse ? "In Use" : "Remove"}
			</Button>
			<div className={styles.name_div}>
				<div>{audioKey.name}</div>
			</div>
			<div className={styles.playback_wrapper}>
				<S3PlaybackWrapper
					audioId={audioKey.audio_id.toString()}
					performerId={audioKey.performer_id.toString()}
				/>
			</div>
		</div>
	);
}

export default PerformerProfileAudioPaper;
