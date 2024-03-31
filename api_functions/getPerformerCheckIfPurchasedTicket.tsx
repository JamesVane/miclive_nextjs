/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";

export async function getPerformerCheckIfPurchasedTicket(
	request_specific_event_id: number
): Promise<string> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/checkinforperformer/getperformercheckifpurchasedticket";

	const currentUser = await Auth.currentAuthenticatedUser();
	const authToken = currentUser.signInUserSession.idToken.jwtToken;

	try {
		const response = await axios.get(endpoint, {
			params: {
				request_specific_event_id,
			},
			headers: {
				Authorization: `Bearer ${authToken}`,
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
