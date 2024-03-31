/** @format */
import { Auth } from "aws-amplify";

export async function postCreateAndReturnTempAccountCode(
	requestPhoneNumber: string,
	requestUsername: string,
	isNewUser: boolean
): Promise<string> {
	const endpoint = `https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/tempaccount/postcreateandreturntempaccountcode`;
	const url = new URL(endpoint);
	url.searchParams.append("request_phone_number", requestPhoneNumber);
	url.searchParams.append("request_username", requestUsername);
	url.searchParams.append("request_is_new_user", isNewUser ? "true" : "false");

	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const response = await fetch(url.toString(), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();
		return data.message;
	} catch (error) {
		console.error("Error creating and returning temp account code:", error);
		throw error;
	}
}
