/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";

interface Cords {
	lat: number;
	lng: number;
}

interface Location {
	name: string;
	cords: Cords;
}

export interface BaseEvent {
	name: string;
	tagline: string;
	baseEventDescription: string;
}

export interface SpecificEvent {
	start_time: string;
	end_time: string;
	location: Location;
	total_performers: number;
	time_per_performer: number;
	songs_per_performer: number;
	ticket_amount: number;
	regular_ticket_price: number;
	early_bird_ticket_price: number;
	early_bird_end_time: string;
	description: string;
}

export interface RequestBody {
	baseEvent: BaseEvent;
	specificEvent: SpecificEvent;
}

export interface ResponseData {
	baseEventId: number;
	specificEventId: number;
	message: string;
	DjDateInviteUrlKey: string;
	DjEventInviteUrlKey: string;
}

export const createEvent = async (body: RequestBody): Promise<ResponseData> => {
	const currentUser = await Auth.currentAuthenticatedUser();
	const authToken = currentUser.signInUserSession.idToken.jwtToken;
	const result = await axios.post<ResponseData>(
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/createevent/createbaseandspecificevent",
		body,
		{
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		}
	);
	return result.data;
};
