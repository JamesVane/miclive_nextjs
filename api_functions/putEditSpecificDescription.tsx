/** @format */
import { Auth } from "aws-amplify";

export async function putUpdateEventDescription(
	specificEventId: number,
	description: string
): Promise<void> {
	const url =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/editevent/puteditspecificdescription";
	const body = {
		query_specific_event_id: specificEventId,
		query_description: description,
	};
	const currentUser = await Auth.currentAuthenticatedUser();
	const authToken = currentUser.signInUserSession.idToken.jwtToken;

	const response = await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const responseData = await response.json();
	console.log(responseData.message);
}
