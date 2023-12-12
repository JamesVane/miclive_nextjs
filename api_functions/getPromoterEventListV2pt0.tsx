/** @format */

import axios from "axios";

export interface EventData {
	event_name: string;
	event_tagline: string;
	base_event_id: number;
}

export async function getPromoterEventListV2pt0(
	promoterId: string
): Promise<EventData[] | null> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/promoter/getpromotereventlistv2pt0";

	try {
		const response = await axios.get(endpoint, {
			params: {
				request_promoter_id: promoterId,
			},
		});

		return response.data as EventData[];
	} catch (error) {
		console.error("Error fetching events:", error);
		if (axios.isAxiosError(error)) {
			return null;
		} else {
			console.log("An unexpected error occurred");
			return null;
		}
	}
}
