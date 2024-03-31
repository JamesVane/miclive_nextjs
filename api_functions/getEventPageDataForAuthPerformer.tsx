/** @format */

import axios from "axios";
import {
	AuthEventPageData,
	EventPageReducerType,
} from "@desk/NewEventPage/NewEventPageReducer";
import { Auth } from "aws-amplify";

export async function getEventPageDataForAuthPerformer(
	request_event_name: string,
	authToken: string
): Promise<EventPageReducerType> {
	const apiEndpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/performer/geteventpagedataforauthperformer";
	try {
		const response = await axios.get<AuthEventPageData>(apiEndpoint, {
			params: {
				request_event_name,
			},
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
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
