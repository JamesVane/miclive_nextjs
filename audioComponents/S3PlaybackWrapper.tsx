/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAudioUrl } from "../store/audioUrlStore";
import { getAudioSignedUrl } from "../api_functions/getAudioSignedUrl";
import AudioPlayback from "./AudioPlayback";
import { RootState } from "../store/rootStore";
import SimpleAudioPlayback from "./SimpleAudioPlayback";

interface S3PlaybackWrapperProps {
	performerId?: string;
	audioId?: string;
	premadePath?: string;
	simple?: boolean;
}

function S3PlaybackWrapper({
	performerId,
	audioId,
	premadePath,
	simple,
}: S3PlaybackWrapperProps) {
	const dispatch = useDispatch();
	const s3Path = `performer_${performerId}/audio_${audioId}`;
	const audioUrl = useSelector((state: RootState) => state.audioUrl[s3Path]);

	const [src, setSrc] = useState("");
	const [isAudioReady, setIsAudioReady] = useState(true);
	const [audioLoadAttempts, setAudioLoadAttempts] = useState(0);
	const MAX_AUDIO_LOAD_ATTEMPTS = 3;

	const updateSignedUrl = () => {
		if (audioLoadAttempts < MAX_AUDIO_LOAD_ATTEMPTS) {
			setAudioLoadAttempts(audioLoadAttempts + 1);

			getAudioSignedUrl(premadePath ? premadePath : s3Path)
				.then((signedUrlResponse) => {
					dispatch(
						setAudioUrl({
							path: premadePath ? premadePath : s3Path,
							url: signedUrlResponse.url,
						})
					);
					setSrc(signedUrlResponse.url);
					console.log("audio state set", s3Path);
					console.log("signedURL", signedUrlResponse.url);
				})
				.catch((error) => {
					console.error("Error getting signed URL:", error);
				});
		} else {
			console.error("Max audio load attempts reached. Audio failed to load.");
		}
	};

	useEffect(() => {
		if (audioUrl) {
			setSrc(audioUrl);
		} else {
			updateSignedUrl();
		}
	}, [performerId, audioId, premadePath]);

	return (
		<>
			{simple ? (
				<SimpleAudioPlayback
					src={src}
					isAudioReady={isAudioReady}
					onInvalidUrl={updateSignedUrl}
					onAudioReady={setIsAudioReady}
				/>
			) : (
				<AudioPlayback
					src={src}
					isAudioReady={isAudioReady}
					onInvalidUrl={updateSignedUrl}
					onAudioReady={setIsAudioReady}
				/>
			)}
		</>
	);
}

export default S3PlaybackWrapper;
