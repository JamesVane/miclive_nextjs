/** @format */

import axios from "axios";

export interface Promoter {
	promoter_sub: string;
	promoter_name: string;
	promoter_tagline: string;
	promoter_id: number;
	promoter_info: {
		City?: string;
		Email?: string;
		Phone?: string;
		IG?: string;
		Link?: string;
	} | null;
}

export interface DJ {
	dj_sub: string;
	dj_name: string;
	dj_tagline: string;
	dj_id: number;
	dj_info: {
		City?: string;
		Email?: string;
		Phone?: string;
		IG?: string;
		Link?: string;
	} | null;
}

export interface Performer {
	performer: number;
	cue_position: number;
	performer_sub: string;
	performer_name: string;
	performer_tagline: string;
	performer_info: {
		City?: string;
		Email?: string;
		Phone?: string;
		IG?: string;
		Link?: string;
	} | null;
}

export interface PreviousEvent {
	event_name: string;
	event_tagline: string;
	start_time: number;
	end_time: number;
	date_description: string;
	location: { name: string; cords: { lat: number; lng: number } };
	submitted_audio: {
		[key: string]: { audioName: string; audioKey: string; length: number };
	} | null;
	base_event_id: number;
	specific_event_id: number;
	promoter: Promoter;
	dj: DJ;
	roster: Array<Performer>;
}

export interface UpcomingEvent {
	event_name: string;
	event_tagline: string;
	start_time: number;
	end_time: number;
	date_description: string;
	location: { name: string; cords: { lat: number; lng: number } };
	songs_per_performer: number;
	time_per_performer: string;
	base_event_id: number;
	specific_event_id: number;
	used_audio_time: number;
	submitted_audio: {
		[key: string]: { audioName: string; audioKey: string; length: number };
	} | null;
	promoter: Promoter;
	dj: DJ;
}

export type ParsedPerformerTicketResponseStructure =
	| {
			type: "upcoming_date_with_performer_id";
			data: UpcomingEvent;
	  }
	| {
			type: "previous_date_with_performer_id";
			data: PreviousEvent;
	  };

export async function getSingleDateInfoWithPerformerId(
	request_specific_event_id: string,
	request_performer_id: string
): Promise<ParsedPerformerTicketResponseStructure | null> {
	try {
		const response = await axios.get(
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/performer/getsingledateinfowithperformerid",
			{
				params: {
					request_specific_event_id,
					request_performer_id,
				},
			}
		);

		if (response.status === 200) {
			console.log("Success:", response.data);
			const parsedResponse: ParsedPerformerTicketResponseStructure = JSON.parse(
				response.data.body
			);
			return parsedResponse;
		} else {
			console.error("Failed with status:", response.status);
			return null;
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("Axios error:", error.message);
		} else {
			console.error("Unexpected error:", error);
		}
		return null;
	}
}
