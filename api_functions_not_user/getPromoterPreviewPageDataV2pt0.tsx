/** @format */

import axios from "axios";

export type EventObject = {
	event_name: string;
	event_tagline: string;
	base_event_id: string;
};

type PromotereventsArray = EventObject[];

export interface PromoterPreviewData {
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
	events: PromotereventsArray;
}

export async function getPromoterPreviewPageDataV2pt0(
	requestPromoterName: string
): Promise<PromoterPreviewData | null> {
	const endpointUrl =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getpromoterpreviewpagedatav2pt0";

	try {
		const response = await axios.get<PromoterPreviewData>(endpointUrl, {
			params: { request_promoter_name: requestPromoterName },
		});

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error("Error message:", error.message);
			if (error.response) {
				console.error("Error response data:", error.response.data);
			} else if (error.request) {
				console.error("Error request:", error.request);
			}
		} else {
			console.error("Error:", error);
		}
		return null;
	}
}
