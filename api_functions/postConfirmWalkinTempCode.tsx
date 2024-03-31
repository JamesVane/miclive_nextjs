/** @format */
import { Auth } from "aws-amplify";

interface postConfirmWalkinTempCodeInput {
	requestPhoneNumber: string;
	requestCode: string;
	requestUsername: string;
	requestSpecificEventId: string;
}

export async function postConfirmWalkinTempCode({
	requestPhoneNumber,
	requestCode,
	requestUsername,
	requestSpecificEventId,
}: postConfirmWalkinTempCodeInput): Promise<{
	error?: string;
	uuid: string;
	performerRoleId: string;
}> {
	const endpoint = `https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/tempaccount/postconfirmwalkintempcode`;
	const url = new URL(endpoint);
	url.searchParams.append("request_phone_number", requestPhoneNumber);
	url.searchParams.append("request_code", requestCode);
	url.searchParams.append("request_username", requestUsername);
	url.searchParams.append("request_specific_event_id", requestSpecificEventId);

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
		if (data.error) {
			return {
				uuid: "",
				performerRoleId: "",
				error: "Incorrect Code.",
			};
		} else {
			return {
				uuid: data.new_uuid,
				performerRoleId: data.return_performer_role_id,
			};
		}
	} catch (error) {
		console.error("Error confirming walk-in temp code:", error);
		throw error;
	}
}
