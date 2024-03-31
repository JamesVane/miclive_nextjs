/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";

interface Event {
	event_name: string;
	event_tagline: string;
	base_event_id: number;
}

export async function getPerformerFollowingListV2point0(): Promise<
	Event[] | null
> {
	const currentUser = await Auth.currentAuthenticatedUser();
	const authToken = currentUser.signInUserSession.idToken.jwtToken;

	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/performer/getperformerfollowinglistv2point0";

	try {
		const response = await axios.get(endpoint, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
		return response.data as Event[];
	} catch (error) {
		console.error("Error fetching performer following list:", error);
		return null;
	}
}
