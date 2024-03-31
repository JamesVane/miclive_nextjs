/** @format */

import S3PlaybackWrapper from "@/audioComponents/S3PlaybackWrapper";
import styles from "./styles.module.css";
import { Button, Divider, LinearProgress } from "@mui/material";
import { useState } from "react";
import { getPerformerProfileAudioKeys } from "@/api_functions_need_to_add_auth/getPerformerProfileAudioKeys";
import { useDispatch } from "react-redux";
import { setPerformerAudioKey } from "@/store/performerAudioKeysStore";
import { postRemoveAudioFromSaved } from "@/api_functions/postRemoveAudioFromSaved";
import {
	RemoveCircleRounded,
	DeleteForeverRounded,
	CloseRounded,
} from "@mui/icons-material";

interface PerformerProfileAudioPaperMobileProps {
	audioKey: {
		audio_id: number;
		performer_id: number;
		name: string;
		isInUse: boolean;
	};
}

function PerformerProfileAudioPaperMobile({
	audioKey,
}: PerformerProfileAudioPaperMobileProps) {
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
		await postRemoveAudioFromSaved(audioKey.audio_id).then(() => {
			refreshAudioKeys();
			setIsDeleting(false);
		});

		setConfirmDelete(false);
		setIsDeleted(true);
	}

	return (
		<div
			className={styles.paper_main_div}
			style={{ display: isDeleted ? "none" : "flex" }}>
			{confirmDelete ? (
				<div className={styles.paper_modal}>
					<div className={styles.paper_name_div}>{audioKey.name}</div>
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
			<div className={styles.paper_button_and_name}>
				<div className={styles.paper_name_div}>
					<div className={styles.elipse_text}>{audioKey.name}</div>
				</div>
				<div className={styles.paper_remove_div}>
					<Button
						onMouseEnter={() => setRemoveButtonHover(true)}
						onMouseLeave={() => setRemoveButtonHover(false)}
						endIcon={<RemoveCircleRounded />}
						onClick={() => setConfirmDelete(true)}
						variant="outlined"
						color="warning"
						size="small"
						disabled={audioKey.isInUse}>
						{audioKey.isInUse ? "In Use" : "Remove"}
					</Button>
				</div>
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

export default PerformerProfileAudioPaperMobile;
