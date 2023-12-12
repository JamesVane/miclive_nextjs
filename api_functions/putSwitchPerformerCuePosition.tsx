/** @format */

import axios from "axios";

interface PutParams {
	query_performer_id: number;
	query_specific_event: number;
	query_cue_position: number;
}

export async function putSwitchPerformerCuePosition(
	params: PutParams
): Promise<string> {
	try {
		const response = await axios.put(
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/djmanageevent/putswitchperformercueposition",
			params
		);
		return response.data.message;
	} catch (error) {
		console.error(`Error: ${error}`);
		throw error;
	}
}
