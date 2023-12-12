/** @format */
import {
	AuthEventPageData,
	EventPageReducerType,
} from "@desk/NewEventPage/NewEventPageReducer";
import axios from "axios";

export async function getEventPageDataForUnauthenticatedUser(
	requestEventName: string
): Promise<EventPageReducerType> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/geteventpagedataforunauthenticateduser";

	try {
		const response = await axios.get<AuthEventPageData>(endpoint, {
			params: { request_event_name: requestEventName },
		});

		return {
			type: "not performer",
			data: response.data as AuthEventPageData,
		};
	} catch (error) {
		if (axios.isAxiosError(error)) {
			// Handle Axios-specific error
			console.error("Axios error:", error.message);
		} else {
			// Handle unexpected errors
			console.error("Unexpected error:", error);
		}
		throw error;
	}
}
