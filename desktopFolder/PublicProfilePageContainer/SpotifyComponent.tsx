/** @format */

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSpotifyAccessToken } from "@/api_functions_no_auth/getSpotifyAccessToken";
import styles from "./styles.module.css";

interface SpotifyComponentProps {
	url: string;
}

function SpotifyComponent({ url }: SpotifyComponentProps) {
	// const [songData, setSongData] = useState(null);

	// const {
	// 	status: accessTokenStatus,
	// 	data: accessTokenData,
	// 	error: accessTokenError,
	// 	isFetching: accessTokenIsFetching,
	// 	refetch: accessTokenRefetch,
	// } = useQuery({
	// 	queryKey: ["spotifyAccessToken"],
	// 	queryFn: getSpotifyAccessToken,
	// });

	// useEffect(() => {
	// 	if (accessTokenData && accessTokenStatus !== "pending") {
	// 		fetch(`https://api.spotify.com/v1/tracks/${url}`, {
	// 			headers: {
	// 				Authorization: `Bearer ${accessTokenData}`,
	// 			},
	// 		})
	// 			.then((response) => response.json())
	// 			.then((data: any) => {
	// 				console.log(":data.tracks.items[0]", data);
	// 				// setSongData(data.tracks.items[0]);
	// 			});
	// 	}
	// }, [accessTokenData, accessTokenStatus]);
	return (
		// <div
		// 	style={{
		// 		width: "calc(100% - 10px)",
		// 		height: "150px",
		// 		maxHeight: "150px",
		// 		marginTop: "10px",
		// 		backgroundColor: "green",
		// 	}}>
		<div className={styles.spotify_container}>
			<iframe
				style={{
					borderRadius: "12px",
					width: "calc(100% - 10px)",
					marginTop: "10px",
					height: "160px",
					maxHeight: "160px",
					display: "flex",
				}}
				src={`https://open.spotify.com/embed/track/${url}?utm_source=generator`}
				width="100%"
				height="160"
				frameBorder="0"
				// allowfullscreen=""
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				loading="lazy"></iframe>
		</div>
	);
}

export default SpotifyComponent;
