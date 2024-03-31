/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";

interface FollowEventParams {
	request_new_following_id: number;
}

export async function putPerformerFollowEvent(
	authToken: any,
	params: FollowEventParams
): Promise<number[]> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/putperformerfollowevent";
	try {
		const response = await axios.put(endpoint, params, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
		return response.data.updated_following;
	} catch (error: any) {
		console.error(
			"Error following event:",
			error.response?.data || error.message
		);
		throw error;
	}
}
