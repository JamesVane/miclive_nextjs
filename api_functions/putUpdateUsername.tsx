/** @format */
import { Auth } from "aws-amplify";

export async function putUpdateUsername(
	requestNewUsername: string
): Promise<string> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/putUpdateUsername";
	const body = JSON.stringify({
		request_new_username: requestNewUsername,
	});

	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const response = await fetch(endpoint, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
			},
			body: body,
		});

		switch (response.status) {
			case 200:
				return "Successfully changed username";
			case 400:
				return "Invalid Username";
			case 409:
				return "Username exists";
			case 500:
				return "An error occurred";
			default:
				return "Unexpected response code";
		}
	} catch (error) {
		console.error("Error during API call:", error);
		return "Failed to make the API call";
	}
}
