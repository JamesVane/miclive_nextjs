/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";

const BASE_API_ENDPOINT =
	"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getdjbaseinvitelinkagain";

export async function getDjBaseInviteLink(
	request_base_event_id: number
): Promise<any> {
	try {
		const response = await axios.get(BASE_API_ENDPOINT, {
			params: {
				request_base_event_id,
			},
		});

		return response.data.Value;
	} catch (error) {
		console.error("Error fetching DJ Base Invite Link:", error);
		throw error;
	}
}

const SPECIFIC_API_ENDPOINT =
	"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getdjdateinvitelinkagain";

export async function getDjDateInviteLinkAgain(
	request_specific_event_id: number
): Promise<any> {
	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const response = await axios.get(SPECIFIC_API_ENDPOINT, {
			params: {
				request_specific_event_id,
			},
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});

		return response.data.Value;
	} catch (error) {
		console.error("Error fetching DJ Date Invite Link:", error);
		throw error;
	}
}
