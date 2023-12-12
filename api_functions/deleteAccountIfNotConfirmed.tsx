/** @format */

import axios from "axios";

const ENDPOINT =
	"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/createaccount/deleteaccountifnotconfirmed";

export async function deleteAccountIfNotConfirmed(
	phoneNumber: string
): Promise<string> {
	try {
		// Call the API endpoint with the given phone number
		const response = await axios.delete(ENDPOINT, {
			params: {
				request_phone: phoneNumber,
			},
		});

		// Check for response status
		if (response.status === 200) {
			const data = response.data;
			return data.didDelete;
		} else {
			throw new Error(`Unexpected response code: ${response.status}`);
		}
	} catch (error: any) {
		throw new Error(`Error deleting user: ${error.message}`);
	}
}
