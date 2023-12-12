/** @format */

import styles from "./styles.module.css";
import {
	Button,
	Typography,
	LinearProgress,
	Paper,
	Divider,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/rootStore";
import { setPerformerAudioKey } from "@/store/performerAudioKeysStore";
import { getPerformerProfileAudioKeys } from "@/api_functions/getPerformerProfileAudioKeys";
import {
	UploadFileRounded,
	CheckRounded,
	FileUploadRounded,
	ClearRounded,
} from "@mui/icons-material";
import { postAudio } from "@/api_functions/postAudio";
import { PostPerformerChangeSubmittedAudioFromExisting } from "@/api_functions/PostPerformerChangeSubmittedAudioFromExisting";
import { Auth } from "aws-amplify";

interface UploadAudioProps {
	close: () => void;
	forTicket?: boolean;
	specificEventId?: number;
	addNewOpen?: number;
	refreshTickets?: () => void;
}

function PerformerAddAudio({
	close,
	forTicket,
	specificEventId,
	addNewOpen,
	refreshTickets,
}: UploadAudioProps) {
	const dispatch = useDispatch();
	const [audioFile, setAudioFile] = useState<File | null>(null);
	const [uploadedSuccess, setUploadedSuccess] = useState<boolean>(false);
	const [uploadInProgress, setUploadInProgress] = useState<boolean>(false);
	const [uploadError, setUploadError] = useState<boolean>(false);

	const usersStateFromStore = useSelector(
		(state: RootState) => state.usersState
	);

	async function refreshAudioKeys() {
		if (usersStateFromStore) {
			const performerId = usersStateFromStore!.primary_key;

			const audioKeysNew = await getPerformerProfileAudioKeys(performerId);
			dispatch(setPerformerAudioKey(audioKeysNew));
		}
	}

	async function onAudioSubmit(file: File) {
		const user = await Auth.currentAuthenticatedUser();
		const roleId = user.attributes["custom:RoleId"];

		setUploadInProgress(true);
		try {
			const duration = await getAudioDuration(file);
			console.log(
				"Audio name:",
				file.name,
				"Duration:",
				duration,
				"file",
				audioFile
			);

			const performerId = typeof roleId === "string" ? Number(roleId) : roleId;
			const audioName = file.name;
			const audioLength = Math.floor(duration);

			const response = await postAudio(
				performerId,
				audioName,
				audioLength,
				file
			);
			if (response.message === "Audio file uploaded successfully") {
				if (forTicket) {
					PostPerformerChangeSubmittedAudioFromExisting(
						performerId,
						specificEventId!,
						{
							[addNewOpen!]: {
								audioName: audioName,
								audioKey: response.s3_key,
								length: audioLength,
							},
						}
					);
				}
				setUploadedSuccess(true);
				setUploadInProgress(false);
			}
		} catch (error) {
			setUploadInProgress(false);
			setUploadError(true);
			console.error("Failed to get audio duration or upload audio:", error);
		}
	}

	function getAudioDuration(file: File): Promise<number> {
		return new Promise((resolve, reject) => {
			const audio = new Audio(URL.createObjectURL(file));
			audio.addEventListener("loadedmetadata", () => {
				resolve(audio.duration);
			});
			audio.addEventListener("error", (error) => {
				reject(error);
			});
		});
	}

	const onClick = () => {
		if (audioFile) {
			onAudioSubmit(audioFile);
		}
	};

	async function handleDone() {
		if (forTicket) {
			await refreshAudioKeys().then(() => {
				refreshTickets!();
			});
		} else {
			refreshAudioKeys();
		}
		close();
	}

	function handleClickOff(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
		if (event.target === event.currentTarget) {
			if (uploadedSuccess) {
				handleDone();
			} else {
				close();
			}
		}
	}

	function SuccessComponent() {
		return (
			<div className={styles.success_display}>
				<Typography color="primary" sx={{ fontSize: "25px" }}>
					{audioFile && audioFile.name}
				</Typography>
				<Typography
					sx={{ fontWeight: "bold", fontSize: "25px" }}
					color="#66bb6aff">
					Submitted Successfully!
				</Typography>

				<Button
					sx={{ margin: "15px" }}
					onClick={handleDone}
					variant="outlined"
					endIcon={<CheckRounded />}
					color="success">
					done
				</Button>
			</div>
		);
	}

	return (
		<div
			className={styles.main_wrapper}
			onClick={(event) => {
				handleClickOff(event);
			}}>
			<Paper className={styles.main_inner}>
				{uploadedSuccess ? (
					<SuccessComponent />
				) : (
					<>
						{audioFile && (
							<>
								<div className={styles.selected_file_words}>Selected File:</div>
								<div className={styles.display_name}>
									{audioFile.name
										? audioFile.name.length > 22
											? `${audioFile.name.slice(0, 24)}...`
											: audioFile.name
										: ""}
								</div>
							</>
						)}
						<Button
							size="large"
							component="label"
							variant="outlined"
							disabled={uploadInProgress}
							endIcon={<UploadFileRounded />}>
							{audioFile ? "select different audio file" : "select audio file"}
							<input
								type="file"
								onClick={onClick}
								style={{ display: "none" }}
								accept="audio/mp3, audio/wav"
								onChange={(event) => {
									if (event.target.files) {
										setAudioFile(event.target.files[0]);
									}
								}}
							/>
						</Button>

						<Typography
							sx={{
								color: "error.main",
								height: "15px",
								marginBottom: "10px",
							}}>
							{uploadError ? "Error Submiting File" : ""}
						</Typography>
						<div className={styles.border_div}>
							<Divider variant="middle" flexItem />
						</div>
						<div className={styles.buttons_box}>
							<Button
								startIcon={<ClearRounded />}
								disabled={uploadInProgress}
								sx={{ margin: "10px" }}
								color="error"
								size="large"
								variant="outlined"
								onClick={close}>
								Cancel
							</Button>
							<Button
								startIcon={<FileUploadRounded />}
								sx={{ margin: "10px" }}
								size="large"
								color="success"
								variant="outlined"
								onClick={onClick}
								disabled={!audioFile || uploadInProgress || uploadError}>
								Submit
							</Button>
							{uploadInProgress && (
								<LinearProgress
									sx={{ position: "absolute", bottom: 0, width: "100%" }}
									color="primary"
								/>
							)}
						</div>
					</>
				)}
			</Paper>
		</div>
	);
}

export default PerformerAddAudio;
