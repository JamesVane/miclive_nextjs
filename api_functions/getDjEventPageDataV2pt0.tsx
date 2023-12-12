/** @format */

import axios from "axios";

type PromoterInDjEventPageType = {
	promoter_name: string;
	promoter_sub: string;
	promoter_tagline: string;
	promoter_id: number;
	promoter_info: {
		City?: string;
		Email?: string;
		Phone?: string;
		IG?: string;
		Link?: string;
	} | null;
};

export type DjDateType = {
	has_ended: boolean;
	specific_event_id: number;
	start_time: number;
	end_time: number;
	location: { name: string; cords: { lat: number; lng: number } };
	is_dj_for_event: boolean;
};

export type DjEventPageType = {
	base_event_id: number;
	event_name: string;
	tagline: string;
	event_description: string;
	promoter: PromoterInDjEventPageType;
	upcoming_dates: DjDateType[];
	previous_dates: DjDateType[];
};

interface GetDjEventDataParams {
	request_base_event_id: string;
	request_dj_id: number;
}

export async function getDjEventPageDataV2pt0(
	params: GetDjEventDataParams
): Promise<DjEventPageType | null> {
	try {
		const endpoint = `https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/dj/getdjeventpagedatav2pt0`;
		const response = await axios.get<DjEventPageType>(endpoint, { params });

		return response.data;
	} catch (error) {
		console.error("Error fetching DJ event data:", error);
		return null;
	}
}
