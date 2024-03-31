/** @format */

import axios from "axios";

export const postUploadS3Image = async (payload: string, path: string) => {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/uploads3photo";

	try {
		const response = await axios.post(endpoint, payload, {
			params: {
				request_path: path,
			},
			headers: {
				"Content-Type": "application/json",
			},
		});
		return response;
	} catch (error) {
		console.error("Error uploading image to S3:", error);
		throw error;
	}
};
