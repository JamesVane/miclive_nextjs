/** @format */
import { Auth } from "aws-amplify";

export async function getBaseEventImageArray(
	requestBaseEventId: string
): Promise<string[]> {
	const endpoint = `https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/richtext/getbaseeventimagearray`;
	const url = new URL(endpoint);
	url.searchParams.set("request_base_event_id", requestBaseEventId);

	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const response = await fetch(url.toString(), {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		return data.image_array;
	} catch (error) {
		console.error("Error fetching base event image array:", error);
		throw error;
	}
}
