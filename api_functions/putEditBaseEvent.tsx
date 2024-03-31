/** @format */
import { Auth } from "aws-amplify";

interface EditBaseEventPayload {
	query_name: string;
	query_tagline: string;
	query_base_event_id: number;
}

export const editBaseEvent = async (
	payload: EditBaseEventPayload
): Promise<any> => {
	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const response = await fetch(
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/editevent/puteditbaseevent",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
				body: JSON.stringify(payload),
			}
		);

		if (!response.ok) {
			throw new Error("HTTP status " + response.status);
		}

		return await response.json();
	} catch (error) {
		console.error("Error:", error);
		throw error;
	}
};
