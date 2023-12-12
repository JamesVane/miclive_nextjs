/** @format */

// AudioPlayer.tsx
import React, { useRef } from "react";
import { styled } from "@mui/system";
import {
	IconButton,
	Box,
	Slider,
	Typography,
	CircularProgress,
} from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import { useInterval } from "../custom_hooks/useInterval";
import { SliderProps } from "@mui/material/Slider";

interface AudioPlayerProps {
	src: string;
	isAudioReady: boolean;
	onInvalidUrl: () => void;
	onAudioReady: (isReady: boolean) => void;
}

interface BufferedSliderProps extends SliderProps {
	bufferedPercentage: number;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
	src,
	isAudioReady,
	onInvalidUrl,
	onAudioReady,
}) => {
	const audioRef = useRef<HTMLAudioElement>(null);
	const [buffering, setBuffering] = React.useState(false);
	const [isPlaying, setIsPlaying] = React.useState(false);
	const [progress, setProgress] = React.useState(0);
	const [timePlayed, setTimePlayed] = React.useState(0);
	const [duration, setDuration] = React.useState(0);
	const [isInit, setIsInit] = React.useState(false);

	const togglePlay = () => {
		if (!audioRef.current) return;

		if (isPlaying) {
			audioRef.current.pause();
		} else if (!isInit) {
			onAudioReady(false);
			audioRef.current.play();
			audioRef.current.pause();
			audioRef.current.load();
			setBuffering(true);
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	// Update progress
	const updateProgress = () => {
		if (audioRef.current) {
			setProgress(
				(audioRef.current.currentTime / audioRef.current.duration) * 100
			);
			setTimePlayed(audioRef.current.currentTime);
			setDuration(audioRef.current.duration);
		}
	};

	// Set up an interval to update the progress
	useInterval(() => {
		if (isPlaying) {
			updateProgress();
		}
	}, 1000);

	// Handle slider value change
	const handleSliderChange: SliderProps["onChange"] = (
		event,
		newValue,
		activeThumb
	) => {
		if (audioRef.current) {
			const newTime = (audioRef.current.duration * (newValue as number)) / 100;
			audioRef.current.currentTime = newTime;
			setTimePlayed(newTime);
			setProgress(newValue as number);
		}
	};

	// Format time in minutes and seconds
	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60);
		const seconds = Math.floor(time % 60);
		return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	};

	const BufferedSlider = styled(Slider)<BufferedSliderProps>(
		({ theme, bufferedPercentage }) => ({
			"& .MuiSlider-rail": {
				background: `linear-gradient(to right, ${theme.palette.primary.main} ${bufferedPercentage}%, ${theme.palette.grey[300]} ${bufferedPercentage}%)`,
			},
		})
	);

	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
				justifyContent: "center",
				zIndex: "25",
			}}>
			<Box
				sx={{
					width: "calc(100% - 10px)",
					height: "40px",
					flexDirection: "row",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-around",
					border: "2px solid #9ca1a3ff",
					paddingLeft: "5px",
					paddingRight: "10px",
					borderRadius: "10px",
				}}>
				<div
					style={{
						height: "100%",
						width: "150px",
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}>
					<audio
						onWaiting={() => {
							if (isInit) {
								setBuffering(true);
								if (audioRef.current) {
									audioRef.current.pause();
								}
								console.log("waiting");
							}
						}}
						onCanPlayThrough={() => {
							console.log("can play thru");
							if (buffering) {
								setTimeout(() => {
									onAudioReady(true);
									setBuffering(false);
									if (audioRef.current) {
										setIsInit(true);
										audioRef.current.play();
									}
								}, 1000);
							}
						}}
						ref={audioRef}
						src={src}
						onError={() => {
							onInvalidUrl();
						}}
						onEnded={() => setIsPlaying(false)}
						onLoadedMetadata={updateProgress}
						preload="auto"
					/>
					{isAudioReady && !buffering ? (
						<IconButton
							color="primary"
							sx={{ width: "35px", height: "35px" }}
							onClick={togglePlay}>
							{isPlaying ? (
								<Pause sx={{ width: "35px", height: "35px" }} />
							) : (
								<PlayArrow sx={{ width: "35px", height: "35px" }} />
							)}
						</IconButton>
					) : (
						<CircularProgress
							onClick={() => {
								if (audioRef.current) {
									setIsPlaying(false);
									audioRef.current.pause();
									setBuffering(false);
								}
							}}
							size={35}
							sx={{
								marginLeft: 1,
								color: buffering ? "primary.main" : "primary.dark",
							}}
						/>
					)}
					<Typography sx={{ marginLeft: 1 }}>
						{isAudioReady ? formatTime(timePlayed) : "0:00 "} /{" "}
						{isAudioReady ? formatTime(duration) : "0:00"}
					</Typography>
				</div>
				<Slider
					value={progress}
					onChange={handleSliderChange}
					sx={{ display: "flex", flex: 1 }}
					aria-label="Audio progress"
				/>
			</Box>
		</div>
	);
};

export default AudioPlayer;
