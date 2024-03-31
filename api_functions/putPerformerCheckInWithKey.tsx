/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";

interface CheckInResponse {
	success: boolean;
	message?: string;
}

export async function putPerformerCheckInWithKey(
	request_key: string
): Promise<CheckInResponse> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/checkinforperformer/putperformercheckinwithkey";

	try {
		const user = await Auth.currentAuthenticatedUser();
		const authToken = user.signInUserSession.idToken.jwtToken;
		const response = await axios.put(
			endpoint,
			{
				request_key: request_key,
			},
			{
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			}
		);

		const responseData: CheckInResponse = response.data;

		if (response.status !== 200 || !responseData.success) {
			throw new Error(responseData.message || "Failed to check in performer");
		}

		return responseData;
	} catch (error) {
		throw error;
	}
}
