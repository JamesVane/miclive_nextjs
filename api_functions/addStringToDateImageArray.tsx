/** @format */
import { Auth } from "aws-amplify";

export async function addStringToDateImageArray(
	requestSpecificEventId: string,
	requestNewUrl: string
): Promise<void> {
	const endpoint = `https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/richtext/addstringtodateimagearray`;
	const url = new URL(endpoint);
	url.searchParams.set("request_specific_event_id", requestSpecificEventId);

	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const response = await fetch(url.toString(), {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
			},
			body: JSON.stringify({ request_new_url: requestNewUrl }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		console.log("Update successful");
	} catch (error) {
		console.error("Error updating event date image array:", error);
	}
}
