/** @format */

import axios from "axios"; // Using axios for HTTP requests

interface FollowEventParams {
	request_performer_role_id: number;
	request_new_following_id: number;
}

export async function putPerformerFollowEvent(
	params: FollowEventParams
): Promise<number[]> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/putperformerfollowevent";
	try {
		const response = await axios.put(endpoint, params);
		return response.data.updated_following;
	} catch (error: any) {
		console.error(
			"Error following event:",
			error.response?.data || error.message
		);
		throw error;
	}
}
