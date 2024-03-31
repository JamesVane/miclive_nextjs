/** @format */
import { Auth } from "aws-amplify";

interface EventResponse {
	event_id?: number;
	start_time?: string;
	message?: string;
}

export const getNextUpEvent = async (): Promise<EventResponse> => {
	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const response = await fetch(
			`https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getNextUpEvent`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data: EventResponse = await response.json();

		return data;
	} catch (error) {
		console.error("Error fetching next up event:", error);
		return { message: "An error occurred while fetching the event data." };
	}
};
