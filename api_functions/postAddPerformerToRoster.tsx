/** @format */

import axios from "axios";

interface AddPerformerToRosterPayload {
	request_performer_id: number;
	request_specific_event_id: number;
}

export async function addPerformerToRoster(
	data: AddPerformerToRosterPayload
): Promise<any> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/signup/postaddperformertoroster";

	try {
		const response = await axios.post(endpoint, data);
		return response.data;
	} catch (error) {
		throw new Error(`Failed to add performer to roster: ${error}`);
	}
}

export default addPerformerToRoster;
