/** @format */

import axios from "axios";

export interface DjPrimaryEvent {
	event_name: string;
	event_tagline: string;
	base_event_id: number;
}

export async function getDjPrimaryEventsV2pt0(
	requestDjId: string
): Promise<DjPrimaryEvent[] | null> {
	try {
		const response = await axios.get<DjPrimaryEvent[]>(
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/dj/getdjprimaryeventsv2pt0",
			{
				params: { request_dj_id: requestDjId },
			}
		);

		return response.data;
	} catch (error) {
		console.error("Error fetching DJ primary events:", error);
		return null;
	}
}
