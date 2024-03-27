/** @format */

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getSpotifyAccessToken } from "@/api_functions/getSpotifyAccessToken";

interface SpotifyComponentProps {
	url: string;
}

function SpotifyComponent({ url }: SpotifyComponentProps) {
	const [songData, setSongData] = useState(null);

	const {
		status: accessTokenStatus,
		data: accessTokenData,
		error: accessTokenError,
		isFetching: accessTokenIsFetching,
		refetch: accessTokenRefetch,
	} = useQuery({
		queryKey: ["spotifyAccessToken"],
		queryFn: getSpotifyAccessToken,
	});

	useEffect(() => {
		if (accessTokenData && accessTokenStatus !== "pending") {
			fetch(
				"https://api.spotify.com/v1/tracks/6QHlEUJAtLzAtb1ZmhSamg?si=0c45050565e54deb",
				{
					headers: {
						Authorization: `Bearer ${accessTokenData}`,
					},
				}
			)
				.then((response) => response.json())
				.then((data: any) => {
					console.log(":data.tracks.items[0]", data);
					// setSongData(data.tracks.items[0]);
				});
		}
	}, [accessTokenData, accessTokenStatus]);
	return (
		<div
			style={{
				width: "100%",
			}}>
			{/* <iframe
				style={{ borderRadius: "12px", width: "100%" }}
				src="https://open.spotify.com/embed/track/6QHlEUJAtLzAtb1ZmhSamg?utm_source=generator"
				width="100%"
				height="200"
				frameBorder="0"
				// allowfullscreen=""
				allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
				loading="lazy"></iframe> */}
			<iframe
				allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
				//frameborder=""
				// height="175"
				style={{
					width: "100%",
					// maxWidth: "660px",
					overflow: "hidden",
					borderRadius: "10px",
				}}
				sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
				src="https://embed.music.apple.com/us/album/everybody-shooters-too/1617332701?i=1617332912"></iframe>
		</div>
	);
}

export default SpotifyComponent;
