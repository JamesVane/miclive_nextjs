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

export async function getUserProfile(
	role_type: "promoter" | "dj" | "performer",
	sub: string
): Promise<UserProfileResponse> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getcurrentuserprofileinfo";
	const queryParams = new URLSearchParams({ role_type, sub });

	try {
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
		}>(`${endpoint}?${queryParams.toString()}`);
		const { primary_key, tagline, info } = response.data;

		const user = await Auth.currentAuthenticatedUser();
		const username = user.attributes["custom:DisplayUsername"];

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
