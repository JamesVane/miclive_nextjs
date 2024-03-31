/** @format */
import { Auth } from "aws-amplify";

// Define TypeScript interfaces for the request and response for clarity and type safety
interface UpdateUserImageResponse {
	message: string;
}

export async function putUserHasImage(): Promise<UpdateUserImageResponse> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/putUserHasImage";

	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const response = await fetch(endpoint, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: UpdateUserImageResponse = await response.json();
		return data;
	} catch (error) {
		throw new Error(`Failed to update user image: ${error}`);
	}
}
