/** @format */

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Button, Divider, TextField } from "@mui/material";
import { CheckRounded, CloseRounded } from "@mui/icons-material";
import YoutubePlayer from "@/desktopFolder/PublicProfilePageContainer/YoutubePlayer";

interface AddYoutubeProps {
	closeModal: () => void;
}

function AddYoutube({ closeModal }: AddYoutubeProps) {
	const [youtubeUrl, setYoutubeUrl] = useState("");
	const [validUrl, setValidUrl] = useState(false);

	function isValidYTUrl(url: string) {
		if (url === "") {
			return false;
		}
		const regExp = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
		return url.match(regExp);
	}

	useEffect(() => {
		const isValid = isValidYTUrl(youtubeUrl) ? true : false;
		setValidUrl(isValid);
	}, [youtubeUrl]);
	return (
		<>
			<div className={styles.modal_title}>Add YouTube Video</div>
			<div className={styles.divider_div}>
				<Divider variant="middle" flexItem />
			</div>
			<TextField
				value={youtubeUrl}
				onChange={(e) => setYoutubeUrl(e.target.value)}
				sx={{
					marginTop: "20px",
					width: "90%",
				}}
				label="YouTube video URL"
				placeholder="Enter YouTube video URL"
			/>
			<div className={styles.youtube_video_div}>
				{validUrl ? (
					<YoutubePlayer fullWidth url={youtubeUrl} />
				) : (
					"enter a valid youtube url"
				)}
			</div>
			<Button
				startIcon={<CheckRounded />}
				color="success"
				size="large"
				variant="outlined"
				sx={{
					position: "absolute",
					right: "15px",
					bottom: "10px",
				}}>
				save
			</Button>
			<Button
				onClick={closeModal}
				startIcon={<CloseRounded />}
				color="secondary"
				size="large"
				variant="outlined"
				sx={{
					position: "absolute",
					left: "15px",
					bottom: "10px",
				}}>
				cancel
			</Button>
		</>
	);
}

export default AddYoutube;
