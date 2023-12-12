/** @format */

import axios from "axios";
import { EventPageData } from "../store/PromoterEventPageV2pt0Slice";

export const getPromoterEventPageDataV2pt0 = async (
	eventName: string
): Promise<EventPageData | null> => {
	try {
		const response = await axios.get<EventPageData>(
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/promoter/getpromotereventpagedatav2pt0",
			{
				params: { request_event_name: eventName },
			}
		);

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.log(error.response.data);
			return null;
		} else {
			console.log("An unexpected error occurred");
			return null;
		}
	}
};
