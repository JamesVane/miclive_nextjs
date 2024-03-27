/** @format */

import axios from "axios";

export const getLinkPreviewInfo = async (url: string) => {
	const apiUrl = "https://api.linkpreview.net";
	const params = new URLSearchParams({ q: url });
	const TEMP_API_KEY = "f6d9d75d164421f8113fdc923070a18d"; // Replace with your actual API key

	try {
		const response = await axios.get(`${apiUrl}/?${params.toString()}`, {
			headers: {
				"X-Linkpreview-Api-Key": TEMP_API_KEY,
			},
		});

		console.log("Link Preview:", response.data);
		// Handle the response data here
		return response.data;
	} catch (error) {
		console.error("Error fetching link preview:", error);
		// Handle error here
		return null;
	}
};
