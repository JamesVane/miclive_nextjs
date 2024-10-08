/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";

export async function promoterGetQrAndKeyFromDynamo(
	requestSpecificEvent: string
): Promise<any> {
	const API_ENDPOINT =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/promotergetqrandkeyfromdynamo";
	const url = `${API_ENDPOINT}?request_specific_event=${requestSpecificEvent}`;

	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;

		const response = await axios.get(url, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
		return response.data.Value;
	} catch (error: any) {
		throw new Error(`Failed to fetch data: ${error.message}`);
	}
}
