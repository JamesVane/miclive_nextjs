/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";
import { DjEventDateModalDataV2pt0Type } from "../store/djEventDateModalDataV2pt0";

export async function getDjEventDateModalInfoV2pt0(
	requestSpecificEventId: number
): Promise<DjEventDateModalDataV2pt0Type | null> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/dj/getdjeventdatemodalinfov2pt0";

	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const response = await axios.get(endpoint, {
			params: {
				request_specific_event_id: requestSpecificEventId,
			},
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});

		return response.data as DjEventDateModalDataV2pt0Type;
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
}
