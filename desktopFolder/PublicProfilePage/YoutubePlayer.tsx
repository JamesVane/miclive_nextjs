/** @format */

import React from "react";
import styles from "./styles.module.css";
import ReactPlayer from "react-player/youtube";

function YoutubePlayer() {
	return (
		<div className={styles.youtube_player_outer}>
			<div className={styles.youtube_player_div}>
				<ReactPlayer
					style={{
						// width: "100%",
						// minWidth: "100%",
						// maxWidth: "100%",
						height: "100%",
						minHeight: "100%",
						maxHeight: "100%",
						objectFit: "cover",
					}}
					url="https://www.youtube.com/watch?v=iFIvpsNpWLk"
				/>
			</div>
		</div>
	);
}

export default YoutubePlayer;
