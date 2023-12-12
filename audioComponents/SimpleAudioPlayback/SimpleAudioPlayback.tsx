/** @format */

import React, { useRef, useState, useEffect } from "react";
import {
	IconButton,
	CircularProgress,
	Box,
	styled,
	Typography,
} from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import styles from "./styles.module.css";

interface SimpleAudioPlaybackProps {
	src: string;
	isAudioReady: boolean;
	onInvalidUrl: () => void;
	onAudioReady: (isReady: boolean) => void;
}

const TrackProgress = styled(CircularProgress)(({ theme }) => ({
	color: theme.palette.secondary.light,
}));

const Progress = styled(CircularProgress)(({ theme }) => ({
	color: theme.palette.secondary.dark,
	position: "absolute",
}));

function SimpleAudioPlayback({
	src,
	isAudioReady,
	onInvalidUrl,
	onAudioReady,
}: SimpleAudioPlaybackProps) {
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [buffering, setBuffering] = useState(false);
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			if (audioRef.current) {
				const value =
					(audioRef.current.currentTime / audioRef.current.duration) * 100;
				setProgress(value);
			}
		}, 1000);
		return () => clearInterval(interval);
	}, [isPlaying]);

	const handlePlayPause = () => {
		if (!audioRef.current) return;
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const handleAudioError = () => {
		onInvalidUrl();
	};

	const handleAudioLoad = () => {
		onAudioReady(true);
		setBuffering(false);
	};

	const handleAudioBuffer = () => {
		setBuffering(true);
		if (audioRef.current) {
			audioRef.current.pause();
		}
	};

	return (
		<div className={styles.playerContainer}>
			<audio
				ref={audioRef}
				src={src}
				onCanPlayThrough={handleAudioLoad}
				onWaiting={handleAudioBuffer}
				onError={handleAudioError}
			/>
			<Box className={styles.second_box}>
				<TrackProgress
					variant="determinate"
					value={100}
					thickness={1.5}
					style={{ width: "80%", height: "80%" }}
				/>
				<Progress
					variant="determinate"
					value={progress}
					thickness={1.5}
					style={{ width: "80%", height: "80%" }}
				/>
				<Box
					top={0}
					left={0}
					bottom={0}
					right={0}
					position="absolute"
					display="flex"
					alignItems="center"
					sx={{ width: "100%", height: "100%" }}
					justifyContent="center">
					{isAudioReady && !buffering ? (
						<IconButton
							onClick={handlePlayPause}
							sx={{ width: "80%", height: "80%" }}>
							{isPlaying ? (
								<Pause sx={{ width: "120%", height: "120%" }} />
							) : (
								<PlayArrow sx={{ width: "120%", height: "120%" }} />
							)}
						</IconButton>
					) : (
						<Typography variant="subtitle1" component="div" gutterBottom>
							<span className={styles.dot}></span>
							<span className={styles.dot}></span>
							<span className={styles.dot}></span>
						</Typography>
					)}
				</Box>
			</Box>
		</div>
	);
}

export default SimpleAudioPlayback;
