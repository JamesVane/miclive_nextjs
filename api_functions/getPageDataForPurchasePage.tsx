/** @format */

import axios from "axios";

export type PurchasePageData = {
	base_event: number;
	location: {
		name: string;
		cords: { lat: number; lng: number };
	};
	name: string;
	specific_event_id: number;
	start_time: number;
	end_time: number;
};

export async function getPageDataForPurchasePage(
	eventId: string
): Promise<PurchasePageData | null> {
	try {
		const response = await axios.get<PurchasePageData>(
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/performer/getpagedataforpurchasepage",
			{
				params: {
					request_specific_event_id: eventId,
				},
			}
		);

		console.log("Data retrieved successfully:", response.data);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("Error response:", error.response);
		} else {
			console.error("Unexpected error:", error);
		}
		return null;
	}
}
