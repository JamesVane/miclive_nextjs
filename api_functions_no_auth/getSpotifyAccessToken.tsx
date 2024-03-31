/** @format */

import axios from "axios";

export async function getSpotifyAccessToken() {
	const url = "https://accounts.spotify.com/api/token";
	const TEMP_SECTER = "1fafe1971a1c4141af5308e0604dcab2";
	const TEMP_CLIENT_ID = "6b24f08d89dd42f3b9fb375c0172c9b3";

	// Prepare the form data
	const data = new URLSearchParams({
		grant_type: "client_credentials",
		client_id: TEMP_CLIENT_ID,
		client_secret: TEMP_SECTER,
	});

	try {
		const response = await axios.post(url, data, {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		console.log("Token:", response.data);
		return response.data.access_token;
	} catch (error) {
		console.error("Error fetching Spotify token:", error);
		return null;
	}
}
