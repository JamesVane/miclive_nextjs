/** @format */

import axios from "axios";

export const getLinkPreviewInfo = async (url: string) => {
	const apiUrl = "https://api.linkpreview.net";
	const data = new URLSearchParams({
		q: url,
		fields: "canonical,locale,site_name",
	});
	const TEMP_API_KEY = "63f2ba7b6d69598e517fe8a9f3a517cd"; // Replace with your actual API key

	try {
		const response = await axios.post(apiUrl, data.toString(), {
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
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
