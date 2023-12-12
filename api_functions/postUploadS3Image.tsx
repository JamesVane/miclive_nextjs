/** @format */

import React from "react";
import axios from "axios";

// Add the isValidBase64 function
function isValidBase64(str: string) {
	const base64Regex =
		/^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
	return base64Regex.test(str);
}

export const postUploadS3Image = async (payload: string, path: string) => {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/uploads3photo";

	try {
		const response = await axios.post(
			endpoint,
			payload, // Send the base64 string as the request body
			{
				params: {
					request_path: path,
				},
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response;
	} catch (error) {
		console.error("Error uploading image to S3:", error);
		throw error;
	}
};
