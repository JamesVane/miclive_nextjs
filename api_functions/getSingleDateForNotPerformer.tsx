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

export interface NotPerformerEvent {
	has_ended: boolean;
	event_name: string;
	event_tagline: string;
	start_time: number;
	end_time: number;
	date_description: string;
	location: { name: string; cords: { lat: number; lng: number } };
	base_event_id: number;
	specific_event_id: number;
	promoter: Promoter;
	dj: DJ;
	tickets_can_be_sold: boolean;
}

export type ParsedNotPerformerResponseStructure =
	| {
			type: "upcoming_not_performer";
			data: NotPerformerEvent;
	  }
	| {
			type: "previous_not_performer";
			data: NotPerformerEvent;
	  }
	| {
			type: "upcoming_performer_no_ticket";
			data: NotPerformerEvent;
	  }
	| {
			type: "previous_performer_no_ticket";
			data: NotPerformerEvent;
	  };

export async function getSingleDateForNotPerformer(
	eventId: string,
	isActuallyPerformerWithNotTicket: boolean
): Promise<ParsedNotPerformerResponseStructure> {
	const endpointUrl =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getsingledatefornotperformer";

	try {
		const response = await axios.get<ParsedNotPerformerResponseStructure>(
			`${endpointUrl}?request_specific_event_id=${eventId}`
		);
		if (isActuallyPerformerWithNotTicket) {
			if (response.data.type === "upcoming_not_performer") {
				return {
					type: "upcoming_performer_no_ticket",
					data: response.data.data,
				};
			} else {
				return {
					type: "previous_performer_no_ticket",
					data: response.data.data,
				};
			}
		} else {
			return response.data;
		}
	} catch (error) {
		throw error;
	}
}
