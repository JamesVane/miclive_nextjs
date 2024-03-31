/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";

export type DjTicketEvent = {
	specific_event_id: number;
	has_ended: boolean;
	is_primary_dj: boolean;
	start_time: number;
	end_time: number;
	location: { name: string; cords: { lat: number; lng: number } };
	base_event_id: number;
	event_name: string;
};

export type DjEventDateV2pt0Type = {
	isDj: boolean;
	modalIsOpen: number | null;
	datesObj: upPrevObj;
};

export type upPrevObj = {
	previous_array: DjTicketEvent[];
	upcoming_array: DjTicketEvent[];
};

export async function getDjEventDateList(): Promise<upPrevObj | null> {
	const apiUrl =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/dj/getdjeventdatelistv2pt0";
	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const response = await axios.get<upPrevObj>(apiUrl, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});

		return response.data;
	} catch (error) {
		console.error("Error fetching DJ event data:", error);
		return null;
	}
}
