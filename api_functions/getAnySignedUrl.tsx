/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";

interface GetSignedUrlResponse {
	url: string;
}

// !!!
// ONLY FOR PROMOTER QR CODE AS OF RIGHT NOW
// !!!

export async function getSignedUrl(
	type: "qr",
	id: string
): Promise<string | null> {
	let path = "";

	switch (type) {
		case "qr":
			path = `${id}.png`;
			break;
		default:
			throw new Error("Invalid type provided");
	}

	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;

		const apiEndpoint =
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getanysignedurl";
		const response = await axios.get<GetSignedUrlResponse>(apiEndpoint, {
			params: {
				path,
				// bucket: type === "qr" ? "checkinqrcodes" : "miclivedevuserphotos",
			},
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});

		return response.data.url;
	} catch (error) {
		console.error("Error fetching signed URL:", error);
		return null;
	}
}

// !!!
// ONLY FOR PROMOTER QR CODE AS OF RIGHT NOW
// !!!
