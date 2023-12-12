/** @format */

import axios from "axios";

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
	promoter_id: number;
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
	const result = await axios.post<ResponseData>(
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/createevent/createbaseandspecificevent",
		body
	);
	return result.data;
};
