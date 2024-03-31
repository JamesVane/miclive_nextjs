/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";

export interface UserProfileResponse {
	primary_key: string;
	tagline: string;
	info: {
		City: string | null;
		Email: string | null;
		Phone: string | null;
		IG: string | null;
		Link: string | null;
	} | null;
	username: string;
}

export async function getUserProfile(): Promise<UserProfileResponse> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getcurrentuserprofileinfo";

	try {
		const user = await Auth.currentAuthenticatedUser();
		const username = user.attributes["custom:DisplayUsername"];
		const authToken = user.signInUserSession.idToken.jwtToken;

		const response = await axios.get<{
			primary_key: string;
			tagline: string;
			info: {
				City: string | null;
				Email: string | null;
				Phone: string | null;
				IG: string | null;
				Link: string | null;
			} | null;
		}>(endpoint, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
		const { primary_key, tagline, info } = response.data;

		return {
			primary_key,
			tagline,
			info,
			username,
		};
	} catch (error) {
		console.error("Error fetching user profile:", error);
		throw error;
	}
}
