/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";

interface deleteRemoveDjFromBaseEventParams {
	request_base_event_id: string;
	request_dj_id: string;
}

export async function deleteRemoveDjFromBaseEvent(
	params: deleteRemoveDjFromBaseEventParams
): Promise<any> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/deleteremovedjfrombaseevent";

	try {
		// Construct the full URL with query parameters
		const fullUrl = `${endpoint}?request_base_event_id=${params.request_base_event_id}&request_dj_id=${params.request_dj_id}`;

		const response = await axios.delete(fullUrl, {
			headers: {
				"Content-Type": "application/json",
			},
		});

		return response.data;
	} catch (error) {
		console.error("Failed to remove DJ:", error);
		throw error;
	}
}

interface deleteRemoveDjFromSpecificEventParams {
	request_base_event_id: string;
	request_specific_event_id: string;
	request_dj_id: string;
}

export async function deleteRemoveDjFromSpecificEvent(
	params: deleteRemoveDjFromSpecificEventParams
): Promise<any> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/deleteremovedjfromspecificevent";

	const url = `${endpoint}?request_base_event_id=${params.request_base_event_id}&request_specific_event_id=${params.request_specific_event_id}&request_dj_id=${params.request_dj_id}`;

	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const response = await axios.delete(url, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Failed to remove DJ:", error);
		throw error;
	}
}
