/** @format */

import axios from "axios"; // Ensure you've installed the 'axios' package.

export async function putAcceptMainDjEventInvite(
	request_dj_id: number,
	request_uuid_key: string
): Promise<string> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/putacceptmaindjeventinvite";

	try {
		const response = await axios.put(endpoint, {
			request_dj_id: request_dj_id,
			request_uuid_key: request_uuid_key,
		});

		// Return the message from the response
		return response.data.message;
	} catch (error) {
		console.error("Error interfacing with the Lambda function:", error);
		return "Error in the request.";
	}
}
