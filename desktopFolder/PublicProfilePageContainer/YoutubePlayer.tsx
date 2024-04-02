/** @format */

import React from "react";
import styles from "./styles.module.css";
import ReactPlayer from "react-player/youtube";
import { isMobile } from "react-device-detect";

interface YoutubePlayerProps {
	url: string;
	fullWidth?: boolean;
}

function YoutubePlayer({ url, fullWidth }: YoutubePlayerProps) {
	return (
		<div
			className={styles.youtube_player_outer}
			style={{
				marginTop: fullWidth ? "0px" : "5px",
				height: isMobile ? "180px" : "270px",
				width: fullWidth ? "100%" : "calc(100% - 10px)",
			}}>
			<div className={styles.youtube_player_div}>
				<ReactPlayer
					style={{
						// width: "100%",
						// minWidth: "100%",
						// maxWidth: "100%",
						height: "100%",
						minHeight: "100%",
						maxHeight: "100%",
					}}
					url={url}
				/>
			</div>
		</div>
	);
}

export default YoutubePlayer;
