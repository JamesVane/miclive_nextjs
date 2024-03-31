/** @format */
import { Auth } from "aws-amplify";

export async function addDjToSpecificEventDate(
	request_invite_key: string
): Promise<string> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/putadddjtospecificeventdate";

	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const response = await fetch(endpoint, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
			},
			body: JSON.stringify({
				request_invite_key,
			}),
		});

		if (!response.ok) {
			throw new Error("Failed to fetch from the API endpoint");
		}

		const responseData = await response.json();

		return responseData.message;
	} catch (error) {
		console.error("Error while adding DJ to specific event date:", error);
		throw error;
	}
}
