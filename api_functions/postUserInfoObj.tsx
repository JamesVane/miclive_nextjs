/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";
import { UserProfileResponse } from "./getUserProfile";

type info = Partial<UserProfileResponse>;

export async function postUserInfoObj(request_payload: info) {
	try {
		const user = await Auth.currentAuthenticatedUser();
		const authToken = user.signInUserSession.idToken.jwtToken;

		const apiUrl =
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/currentuserresources/updatelinks";
		const queryParams = new URLSearchParams({
			payload: JSON.stringify(request_payload),
		});

		const response = await axios.post(apiUrl, null, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
			params: queryParams,
		});

		return response;
	} catch (error) {
		console.error("Error updating links:", error);
		throw error;
	}
}
