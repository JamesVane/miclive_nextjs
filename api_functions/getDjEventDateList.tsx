/** @format */

import axios from "axios";

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

export async function getDjEventDateList(
	requestDjId: string
): Promise<upPrevObj | null> {
	try {
		const response = await axios.get<upPrevObj>(
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/dj/getdjeventdatelistv2pt0",
			{
				params: {
					request_dj_id: requestDjId,
				},
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error fetching DJ event data:", error);
		return null;
	}
}
