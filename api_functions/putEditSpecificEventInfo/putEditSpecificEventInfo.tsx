/** @format */

import axios from "axios";

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
	query_promoter_id: number,
	eventInfo: EventInfo
) {
	try {
		const response = await axios.put(
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/editevent/puteditspecificeventinfo",
			{
				query_specific_event: eventInfo,
				query_specific_event_id: query_specific_event_id,
				query_promoter_id: query_promoter_id,
			}
		);
		return response.data;
	} catch (error: any) {
		throw new Error(`An error occurred: ${error.message}`);
	}
}
