/** @format */

import axios from "axios";

export async function checkIfCheckedIn(
	authToken: any,
	request_specific_event_id: number
): Promise<boolean> {
	try {
		const endpoint =
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getcheckifcheckedin";
		const response = await axios.get(endpoint, {
			params: {
				request_specific_event_id,
			},
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});

		if (response.status === 200 && response.data) {
			return response.data.checked_in;
		} else {
			console.error("Failed to retrieve checked-in status:", response.data);
			return false;
		}
	} catch (error) {
		console.error("Error fetching checked-in status:", error);
		return false;
	}
}
