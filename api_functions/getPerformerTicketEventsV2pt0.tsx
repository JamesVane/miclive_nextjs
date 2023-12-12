/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";

export type TicketEvent = {
	specific_event_id: number;
	has_ended: boolean;
	has_submitted_audio: boolean;
	start_time: number;
	end_time: number;
	location: { name: string; cords: { lat: number; lng: number } };
	base_event_id: number;
	event_name: string;
};

type PerformerEventsResponse = {
	upcoming: TicketEvent[];
	previous: TicketEvent[];
};

export async function getPerformerTicketEventsV2pt0(): Promise<PerformerEventsResponse> {
	const currentUser = await Auth.currentAuthenticatedUser();
	const requestPerformerRoleId = currentUser.attributes["custom:RoleId"];

	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/performer/getperformerticketeventsv2pt0";
	try {
		const response = await axios.get(endpoint, {
			params: {
				request_performer_id: requestPerformerRoleId,
			},
		});

		if (response.status === 200) {
			console.log("TICKETS RESPONSE: ", response.data);
			return response.data as PerformerEventsResponse;
		} else {
			throw new Error(`Unexpected status code: ${response.status}`);
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("Axios error:", error.message);
		} else {
			console.error("Unexpected error:", error);
		}
		throw error;
	}
}
