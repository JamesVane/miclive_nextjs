/** @format */
import { Auth } from "aws-amplify";

export async function updateBaseEventImageArray(
	requestBaseEventId: string,
	imageArray: string[]
): Promise<void> {
	const endpoint = `https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/richtext/updatebaseeventimagearray`;
	const url = new URL(endpoint);
	url.searchParams.set("request_base_event_id", requestBaseEventId);

	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const response = await fetch(url.toString(), {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
			},
			body: JSON.stringify({ image_array: imageArray }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		console.log("Update successful");
	} catch (error) {
		console.error("Error updating base event image array:", error);
	}
}
