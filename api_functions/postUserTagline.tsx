/** @format */

import { Auth } from "aws-amplify";
import axios from "axios";

function validateTagline(tagline: string): [boolean, string] {
	const validCharactersRegex = /^[\w\s\.,!?]+$/;
	const linkRegex = /https?:\/\/[\w.]+/;
	const maxLength = 35;

	if (linkRegex.test(tagline)) {
		return [false, "Links are not allowed in the tagline."];
	} else if (
		validCharactersRegex.test(tagline) &&
		tagline.length <= maxLength
	) {
		return [true, ""];
	} else if (!validCharactersRegex.test(tagline)) {
		return [false, "Invalid tagline. Only standard characters allowed."];
	} else {
		return [false, "Tagline is too long. Maximum length is 35 characters."];
	}
}

export async function postUserTagline(
	queryRole: "performer" | "dj" | "promoter",
	queryPayload: string
): Promise<string> {
	// changed the return type to Promise<number>
	const [isValid, errorMessage] = validateTagline(queryPayload);
	if (!isValid) {
		throw new Error(errorMessage);
	}

	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const queryId = currentUser.attributes.sub;

		const apiUrl =
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/currentuserresources/updateusertagline";

		const queryParams = {
			query_role: queryRole,
			query_id: queryId,
			query_payload: queryPayload,
		};

		const response = await axios.post(apiUrl, null, { params: queryParams });

		if (response.status !== 200) {
			return response.data.error;
		}
		return response.data.message; // return the status
	} catch (error) {
		console.error("Error updating user tagline:", error);
		throw error;
	}
}
