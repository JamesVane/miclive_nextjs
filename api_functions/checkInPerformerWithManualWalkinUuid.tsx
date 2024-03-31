/** @format */
import { Auth } from "aws-amplify";

interface CheckInResponse {
	message?: string;
	error?: string;
}

interface checkInPerformerWithManualWalkinUuidInput {
	requestUUID: string;
	requestPerformerId: string;
	requestSpecificEventId: string;
}

export async function checkInPerformerWithManualWalkinUuid({
	requestUUID,
	requestPerformerId,
	requestSpecificEventId,
}: checkInPerformerWithManualWalkinUuidInput): Promise<CheckInResponse | null> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/tempaccount/checkinperformerwithmanualwalkinuuid";
	const queryParams = new URLSearchParams({
		request_uuid: requestUUID,
		request_performer_id: requestPerformerId,
		request_specific_event_id: requestSpecificEventId,
	});

	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;

		const response = await fetch(`${endpoint}?${queryParams}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${authToken}`,
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data as CheckInResponse;
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
}
