/** @format */

import styles from "./styles.module.css";
import { Button, Typography, LinearProgress } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
	CheckRounded,
	UploadFileRounded,
	CloseRounded,
	FileUploadRounded,
} from "@mui/icons-material";
import { postAudio } from "../../api_functions/postAudio";
import { PostPerformerChangeSubmittedAudioFromExisting } from "../../api_functions/PostPerformerChangeSubmittedAudioFromExisting";
import { Auth } from "aws-amplify";

interface UploadAudioProps {
	close: () => void;
	forTicket?: boolean;
	specificEventId?: number;
	addNewOpen?: number;
	performerIdFromProps?: number;
}

function UploadAudio({
	close,
	forTicket,
	specificEventId,
	addNewOpen,
	performerIdFromProps,
}: UploadAudioProps) {
	const [audioFile, setAudioFile] = useState<File | null>(null);
	const [uploadedSuccess, setUploadedSuccess] = useState<boolean>(false);
	const [uploadInProgress, setUploadInProgress] = useState<boolean>(false);
	const [uploadError, setUploadError] = useState<boolean>(false);

	async function onAudioSubmit(file: File) {
		const currentUser = await Auth.currentAuthenticatedUser();
		const requestPerformerRoleId = currentUser.attributes["custom:RoleId"];
		const roleIdAsNumber: number =
			typeof requestPerformerRoleId === "string"
				? parseInt(requestPerformerRoleId)
				: requestPerformerRoleId;

		const performerIdToBeUsed = performerIdFromProps
			? performerIdFromProps
			: roleIdAsNumber;
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

			const audioName = file.name;
			const audioLength = Math.floor(duration);

			const response = await postAudio(
				performerIdToBeUsed,
				audioName,
				audioLength,
				file
			);
			if (response.message === "Audio file uploaded successfully") {
				if (forTicket) {
					PostPerformerChangeSubmittedAudioFromExisting(
						performerIdToBeUsed,
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

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (acceptedFiles.length > 0 && !uploadInProgress) {
				setAudioFile(acceptedFiles[0]);
			}
		},
		[onAudioSubmit]
	);

	const {
		getRootProps,
		getInputProps,
		isDragAccept,
		isDragReject,
		isDragActive,
	} = useDropzone({
		accept: { "audio/*": ["mp3", "wav", "m4a"] },
		multiple: false,
		onDrop,
		noClick: true,
	});

	const onClick = () => {
		if (audioFile) {
			onAudioSubmit(audioFile);
		}
	};

	function SuccessComponent() {
		return (
			<div className={styles.success_display}>
				<Typography color="secondary" sx={{ fontSize: "25px" }}>
					{audioFile && audioFile.name}
				</Typography>
				<Typography
					sx={{ fontWeight: "bold", fontSize: "25px" }}
					color="primary">
					Submitted Successfully!
				</Typography>

				<Button
					size="large"
					sx={{ margin: "15px" }}
					onClick={() => {
						close();
					}}
					variant="outlined"
					startIcon={<CheckRounded />}
					color="success">
					done
				</Button>
			</div>
		);
	}

	return (
		<div className={styles.main_wrapper}>
			{uploadedSuccess ? (
				<SuccessComponent />
			) : (
				<>
					<div
						{...getRootProps()}
						className={styles.dashed_box}
						style={{
							border: isDragAccept
								? "5px dashed #66bb6aff"
								: isDragReject
								? "5px dashed #ff0000ff"
								: "5px dashed #888661ff",
						}}>
						<Typography
							className={styles.drag_text}
							sx={{
								margin: "10px",
								fontSize: "40px",
								marginTop: "-20px",
							}}>
							{isDragAccept
								? "Drop Audio file Here"
								: isDragReject
								? "File must me a single (1) Audio file"
								: "Drag and Drop an Audio file here, or"}
						</Typography>
						{!isDragActive ? (
							<Button
								size="large"
								component="label"
								variant="outlined"
								disabled={uploadInProgress}
								endIcon={<UploadFileRounded />}>
								click here to Upload Audio
								<input
									{...getInputProps({
										onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
											if (event.target.files) {
												onDrop(Array.from(event.target.files));
											}
										},
									})}
									style={{ display: "none" }}
								/>
							</Button>
						) : null}
						{audioFile && (
							<Typography className={styles.selected_text}>
								Selected file:{" "}
								<span className={styles.selected_text_span}>
									{audioFile.name}
								</span>
							</Typography>
						)}
						{uploadError && (
							<Typography
								sx={{ color: "error.main", position: "absolute", bottom: 30 }}>
								Error Submiting File
							</Typography>
						)}
					</div>
					<div className={styles.buttons_box}>
						<Button
							startIcon={<CloseRounded />}
							disabled={uploadInProgress}
							sx={{ margin: "15px" }}
							color="error"
							size="large"
							variant="outlined"
							onClick={close}>
							Cancel
						</Button>
						<Button
							startIcon={<FileUploadRounded />}
							sx={{ margin: "15px" }}
							size="large"
							color="success"
							variant="outlined"
							onClick={onClick}
							disabled={!audioFile || uploadInProgress}>
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
		</div>
	);
}

export default UploadAudio;
