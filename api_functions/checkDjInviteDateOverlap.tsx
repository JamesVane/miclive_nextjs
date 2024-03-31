/** @format */
import { Auth } from "aws-amplify";

export async function checkDjInviteDateOverlap(
	request_start_time: string,
	request_end_time: string
): Promise<boolean> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getcheckdjinvitedateoverlap";
	const url = new URL(endpoint);

	const currentUser = await Auth.currentAuthenticatedUser();
	const authToken = currentUser.signInUserSession.idToken.jwtToken;

	url.searchParams.append("request_start_time", request_start_time);
	url.searchParams.append("request_end_time", request_end_time);

	try {
		const response = await fetch(url.toString(), {
			method: "GET",
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});

		if (!response.ok) {
			throw new Error("Failed to fetch from the API endpoint");
		}

		const responseData = await response.json();

		return responseData.overlap;
	} catch (error) {
		console.error("Error while checking DJ invite date overlap:", error);
		throw error;
	}
}
