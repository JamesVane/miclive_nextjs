/** @format */

import {
	Promoter,
	Performer,
	DJ,
	ParsedPerformerTicketResponseStructure,
} from "@/api_functions/getSingleDateInfoWithPerformerId";
import { ParsedNotPerformerResponseStructure } from "@/api_functions/getSingleDateForNotPerformer";
import { SubmittedAudioType } from "@/UniversalTypes";

const defaultPromoterObj = {
	promoter_sub: "",
	promoter_name: "",
	promoter_tagline: "",
	promoter_id: 0,
	promoter_info: null,
};

const defaultDjObj = {
	dj_sub: "",
	dj_name: "",
	dj_tagline: "",
	dj_id: 0,
	dj_info: null,
};

type pageStatetype =
	| "error"
	| "loading"
	| "not log in upcoming"
	| "not log in previous"
	| "log in upcoming with ticket"
	| "log in previous with no ticket"
	| "log in previous with ticket"
	| "log in upcoming with no ticket";

export const defaultDateModalState = {
	pageState: "loading" as pageStatetype,
	event_name: "",
	event_tagline: ",",
	start_time: 0,
	end_time: 0,
	date_description: ",",
	location: { name: "", cords: { lat: 0, lng: 0 } },
	submitted_audio: null,
	base_event_id: 0,
	specific_event_id: 0,
	promoter: defaultPromoterObj,
	dj: defaultDjObj,
	roster: [],
	used_audio_time: 0,
	songs_per_performer: 0,
	time_per_performer: "",
	tickets_can_be_sold: false,
};

export type DateModalStateType = {
	pageState: pageStatetype;
	event_name: string;
	event_tagline: string;
	start_time: number;
	end_time: number;
	date_description: string;
	location: { name: string; cords: { lat: number; lng: number } };
	submitted_audio: SubmittedAudioType | null;
	base_event_id: number;
	specific_event_id: number;
	promoter: Promoter;
	dj: DJ;
	roster: DateRoster;
	used_audio_time: number;
	songs_per_performer: number;
	time_per_performer: string;
};

export type DateRoster = Array<Performer>;

export function reducer(
	state: DateModalStateType,
	action:
		| ParsedPerformerTicketResponseStructure
		| ParsedNotPerformerResponseStructure
) {
	switch (action.type) {
		case "upcoming_date_with_performer_id": {
			const dispatchData = action.data;
			return {
				...state,
				pageState: "log in upcoming with ticket" as pageStatetype,
				event_name: dispatchData.event_name,
				event_tagline: dispatchData.event_tagline,
				start_time: dispatchData.start_time,
				end_time: dispatchData.end_time,
				date_description: dispatchData.date_description,
				location: dispatchData.location,
				songs_per_performer: dispatchData.songs_per_performer,
				time_per_performer: dispatchData.time_per_performer,
				base_event_id: dispatchData.base_event_id,
				specific_event_id: dispatchData.specific_event_id,
				used_audio_time: dispatchData.used_audio_time,
				submitted_audio: dispatchData.submitted_audio,
				promoter: dispatchData.promoter,
				dj: dispatchData.dj,
			};
		}
		case "previous_date_with_performer_id": {
			const dispatchData = action.data;
			return {
				...state,
				pageState: "log in previous with ticket" as pageStatetype,
				event_name: dispatchData.event_name,
				event_tagline: dispatchData.event_tagline,
				start_time: dispatchData.start_time,
				end_time: dispatchData.end_time,
				date_description: dispatchData.date_description,
				location: dispatchData.location,
				submitted_audio: dispatchData.submitted_audio,
				base_event_id: dispatchData.base_event_id,
				specific_event_id: dispatchData.specific_event_id,
				promoter: dispatchData.promoter,
				dj: dispatchData.dj,
				roster: dispatchData.roster,
			};
		}
		case "upcoming_not_performer": {
			const dispatchData = action.data;
			return {
				...state,
				pageState: "not log in upcoming" as pageStatetype,
				event_name: dispatchData.event_name,
				event_tagline: dispatchData.event_tagline,
				start_time: dispatchData.start_time,
				end_time: dispatchData.end_time,
				date_description: dispatchData.date_description,
				location: dispatchData.location,
				base_event_id: dispatchData.base_event_id,
				specific_event_id: dispatchData.specific_event_id,
				promoter: dispatchData.promoter,
				dj: dispatchData.dj,
				tickets_can_be_sold: dispatchData.tickets_can_be_sold,
			};
		}
		case "previous_not_performer": {
			const dispatchData = action.data;
			return {
				...state,
				pageState: "not log in previous" as pageStatetype,
				event_name: dispatchData.event_name,
				event_tagline: dispatchData.event_tagline,
				start_time: dispatchData.start_time,
				end_time: dispatchData.end_time,
				date_description: dispatchData.date_description,
				location: dispatchData.location,
				base_event_id: dispatchData.base_event_id,
				specific_event_id: dispatchData.specific_event_id,
				promoter: dispatchData.promoter,
				dj: dispatchData.dj,
				tickets_can_be_sold: dispatchData.tickets_can_be_sold,
			};
		}
		case "upcoming_performer_no_ticket": {
			const dispatchData = action.data;
			return {
				...state,
				pageState: "log in upcoming with no ticket" as pageStatetype,
				event_name: dispatchData.event_name,
				event_tagline: dispatchData.event_tagline,
				start_time: dispatchData.start_time,
				end_time: dispatchData.end_time,
				date_description: dispatchData.date_description,
				location: dispatchData.location,
				base_event_id: dispatchData.base_event_id,
				specific_event_id: dispatchData.specific_event_id,
				promoter: dispatchData.promoter,
				dj: dispatchData.dj,
				tickets_can_be_sold: dispatchData.tickets_can_be_sold,
			};
		}
		case "previous_performer_no_ticket": {
			const dispatchData = action.data;
			return {
				...state,
				pageState: "log in previous with no ticket" as pageStatetype,
				event_name: dispatchData.event_name,
				event_tagline: dispatchData.event_tagline,
				start_time: dispatchData.start_time,
				end_time: dispatchData.end_time,
				date_description: dispatchData.date_description,
				location: dispatchData.location,
				base_event_id: dispatchData.base_event_id,
				specific_event_id: dispatchData.specific_event_id,
				promoter: dispatchData.promoter,
				dj: dispatchData.dj,
				tickets_can_be_sold: dispatchData.tickets_can_be_sold,
			};
		}
	}
}
