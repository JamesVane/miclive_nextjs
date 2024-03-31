/** @format */

import axios from "axios";

const ENDPOINT =
	"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/checkinforperformer/getcheckifcheckinkeyisvalid";

export async function getCheckIfCheckInKeyIsvalid(
	request_key: string
): Promise<any> {
	try {
		const response = await axios.get(ENDPOINT, {
			params: {
				request_key,
			},
		});

		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error(`Request failed with status code: ${response.status}`);
		}
	} catch (error) {
		console.error(`Error checking if Event Key is valid: ${error}`);
		throw error;
	}
}
