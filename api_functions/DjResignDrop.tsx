/** @format */

import axios from "axios";

export async function deleteDjResignFromBaseEvent(
	requestBaseEventId: string,
	requestDjName: string
): Promise<any> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/deletedjresignfrombaseevent";

	try {
		const response = await axios.delete(endpoint, {
			params: {
				request_base_event_id: requestBaseEventId,
				request_dj_name: requestDjName,
			},
		});

		return response.data;
	} catch (error: any) {
		if (error.response) {
			console.error("Server responded with an error:", error.response.data);
			return error.response.data;
		} else if (error.request) {
			console.error("No response received from server:", error.request);
		} else {
			console.error("Error in making the request:", error.message);
		}

		throw error;
	}
}

interface DropEventParameters {
	request_base_event_id: string;
	request_specific_event_id: string;
	request_dj_name: string;
}

export async function deleteDjDropEventDate(
	params: DropEventParameters
): Promise<any> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/deletedjdropeventdate";

	try {
		const response = await axios.delete(endpoint, { params });
		return response.data;
	} catch (error: any) {
		throw new Error(`Failed to drop DJ event date: ${error.message}`);
	}
}
