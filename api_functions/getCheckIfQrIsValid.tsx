/** @format */

import axios from "axios";

const ENDPOINT =
	"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/checkinforperformer/getcheckifqrisvalid";

export async function getCheckIfQrIsValid(request_uuid: string): Promise<any> {
	try {
		const response = await axios.get(ENDPOINT, {
			params: {
				request_uuid,
			},
		});

		if (response.status === 200) {
			return response.data;
		} else {
			throw new Error(`Request failed with status code: ${response.status}`);
		}
	} catch (error) {
		console.error(`Error checking if QR is valid: ${error}`);
		throw error;
	}
}
