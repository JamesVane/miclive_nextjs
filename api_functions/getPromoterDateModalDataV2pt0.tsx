/** @format */

import axios from "axios";
import { PromoterDateInfoV2pt0Type } from "../store/promoterDateInfoV2pt0Slice";

export const getPromoterDateModalDataV2pt0 = async (
	specificEventId: number
): Promise<PromoterDateInfoV2pt0Type | null> => {
	const url =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/promoter/getpromoterdatemodaldatav2pt0";

	try {
		const response = await axios.get<PromoterDateInfoV2pt0Type>(url, {
			params: { request_specific_event_id: specificEventId },
		});

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.log("error: ", error.message);
			return null;
		} else {
			console.log("An unknown error occurred");
			return null;
		}
	}
};
