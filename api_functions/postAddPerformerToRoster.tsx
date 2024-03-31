/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";

interface AddPerformerToRosterPayload {
	request_specific_event_id: number;
}

export async function addPerformerToRoster(
	data: AddPerformerToRosterPayload
): Promise<any> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/signup/postaddperformertoroster";

	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const response = await axios.post(endpoint, data, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
		return response.data;
	} catch (error) {
		throw new Error(`Failed to add performer to roster: ${error}`);
	}
}

export default addPerformerToRoster;
