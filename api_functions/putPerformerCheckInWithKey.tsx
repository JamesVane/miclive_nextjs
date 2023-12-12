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
		const roleId = user.attributes["custom:RoleId"];
		const request_performer_id =
			typeof roleId === "number" ? roleId.toString() : roleId;
		const response = await axios.put(endpoint, {
			request_key: request_key,
			request_performer_id: request_performer_id,
		});

		const responseData: CheckInResponse = response.data;

		if (response.status !== 200 || !responseData.success) {
			throw new Error(responseData.message || "Failed to check in performer");
		}

		return responseData;
	} catch (error) {
		throw error;
	}
}
