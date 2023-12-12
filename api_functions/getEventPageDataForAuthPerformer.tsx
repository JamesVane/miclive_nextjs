/** @format */

import axios from "axios";
import {
	AuthEventPageData,
	EventPageReducerType,
} from "../desktop_folder/pages/NewEventPage/NewEventPageReducer";

export async function getEventPageDataForAuthPerformer(
	request_event_name: string,
	request_performer_id: string
): Promise<EventPageReducerType> {
	try {
		const response = await axios.get<AuthEventPageData>(
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/performer/geteventpagedataforauthperformer",
			{
				params: {
					request_event_name,
					request_performer_id,
				},
			}
		);
		return {
			type: "performer auth",
			data: response.data as AuthEventPageData,
		};
	} catch (error: any) {
		if (axios.isAxiosError(error) && error.response) {
			console.error("Error response:", error.response.data);
		} else {
			console.error("An unexpected error occurred:", error);
		}
		throw error;
	}
}
