/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";
import { UserProfileResponse } from "./getUserProfile";

type info = Partial<UserProfileResponse>;

export async function postUserInfoObj(
	request_type: "promoter" | "dj" | "performer",
	request_payload: info
) {
	try {
		const user = await Auth.currentAuthenticatedUser();
		const userSub = user.attributes.sub;

		const apiUrl =
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/currentuserresources/updatelinks";
		const queryParams = new URLSearchParams({
			query_type: request_type,
			query_id: userSub,
			payload: JSON.stringify(request_payload),
		});

		// Make the POST request with Axios
		const response = await axios.post(apiUrl, null, {
			params: queryParams,
		});

		// Return the response data
		return response.data;
	} catch (error) {
		console.error("Error updating links:", error);
		throw error;
	}
}
