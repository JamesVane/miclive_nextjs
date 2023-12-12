/** @format */

import { Auth } from "aws-amplify";

export async function putPerformerQrCheckin(
	request_id: string
): Promise<boolean> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/checkinforperformer/putperformerqrcheckin";

	const user = await Auth.currentAuthenticatedUser();
	const roleId = user.attributes["custom:RoleId"];
	const request_performer_id =
		typeof roleId === "string" ? Number(roleId) : roleId;

	const requestData = {
		request_id: request_id,
		request_performer_id: request_performer_id,
	};

	try {
		const response = await fetch(endpoint, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestData),
		});

		if (response.status !== 200) {
			throw new Error(`Failed with status code: ${response.status}`);
		}

		const responseBody = await response.json();
		return responseBody.success;
	} catch (error) {
		console.error("Failed to check in performer:", error);
		return false;
	}
}
