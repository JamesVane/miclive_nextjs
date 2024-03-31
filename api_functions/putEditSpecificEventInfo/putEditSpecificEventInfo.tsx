/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";

export type EventInfo = {
	start_time: string;
	end_time: string;
	location: object;
	total_performers: number;
	time_per_performer: number;
	songs_per_performer: number;
	ticket_amount: number;
	regular_ticket_price: number;
	early_bird_ticket_price: number;
	early_bird_end_time: string;
};

export async function putEditSpecificEventInfo(
	query_specific_event_id: number,
	eventInfo: EventInfo
) {
	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const apiEndpoint =
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/editevent/puteditspecificeventinfo";
		const response = await axios.put(
			apiEndpoint,
			{
				query_specific_event: eventInfo,
				query_specific_event_id: query_specific_event_id,
			},
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			}
		);
		return response.data;
	} catch (error: any) {
		throw new Error(`An error occurred: ${error.message}`);
	}
}
