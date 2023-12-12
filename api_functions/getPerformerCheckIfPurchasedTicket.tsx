/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";

export async function getPerformerCheckIfPurchasedTicket(
	request_specific_event_id: number
): Promise<string> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/checkinforperformer/getperformercheckifpurchasedticket";

	const user = await Auth.currentAuthenticatedUser();
	const roleId = user.attributes["custom:RoleId"];
	const request_performer_id =
		typeof roleId === "string" ? parseInt(roleId) : roleId;

	try {
		const response = await axios.get(endpoint, {
			params: {
				request_performer_id,
				request_specific_event_id,
			},
		});

		if (response.status === 200) {
			return response.data.message;
		} else {
			throw new Error(`Unexpected response status: ${response.status}`);
		}
	} catch (error: any) {
		throw new Error(
			`Failed to check performer ticket status: ${error.message}`
		);
	}
}
