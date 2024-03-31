/** @format */
import { Auth } from "aws-amplify";
import { QueryFunctionContext } from "@tanstack/react-query";
import { SubmittedAudioType } from "@/UniversalTypes";

export interface Promoter {
	promoter_sub: string;
	promoter_name: string;
	promoter_tagline: string;
	promoter_id: number;
	promoter_info: {
		city?: string;
		email?: string;
		phone?: string;
		ig?: string;
		link?: string;
	} | null;
}

export interface DJ {
	dj_sub: string;
	dj_name: string;
	dj_tagline: string;
	dj_id: number;
	dj_info: {
		city?: string;
		email?: string;
		phone?: string;
		ig?: string;
		link?: string;
	} | null;
}

type Performer = {
	performer_name: string;
	performer_tagline: string;
	performer_id: number;
	performer_info: {
		city?: string;
		email?: string;
		phone?: string;
		ig?: string;
		link?: string;
	} | null;
	roster_key: number;
};

export type EventInfo = {
	event_has_started: boolean;
	time_per_performer: string;
	base_event_id: number;
	specific_event_id: number;
	event_name: string;
	event_tagline: string;
	base_event_description: string;
	date_description: string;
	start_time: number;
	end_time: number;
	location: { name: string; cords: { lat: number; lng: number } };
	promoter: Promoter;
	dj: DJ;
};

export type RosterType = { [key: number]: Performer };

type performerCurrentEventType = {
	event: EventInfo;
	submitted_audio: SubmittedAudioType | null;
	my_cue_position: number;
	roster: RosterType;
	state: {
		current_cue_position: number;
		has_ended: boolean;
	};
};

export async function getPerformerCurrentEventState({
	queryKey,
}: QueryFunctionContext<
	[
		string,
		{
			request_specific_event_id: number | null;
		}
	]
>): Promise<performerCurrentEventType | null> {
	const requestSpecificEventId = queryKey[1].request_specific_event_id;
	if (requestSpecificEventId) {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;

		const endpoint =
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getperformercurrenteventstate";

		const url = new URL(endpoint);
		url.searchParams.set(
			"request_specific_event_id",
			requestSpecificEventId.toString()
		);

		try {
			const response = await fetch(url.toString(), {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			});

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("There was a problem with the fetch operation:", error);
			throw error;
		}
	} else {
		return null;
	}
}
