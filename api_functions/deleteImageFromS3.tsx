/** @format */
import { Auth } from "aws-amplify";

export async function deleteImageFromS3(
	requestDeletePath: string
): Promise<string> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/deleteimagefroms3";
	const url = new URL(endpoint);
	url.searchParams.append("request_delete_path", requestDeletePath);

	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const response = await fetch(url.toString(), {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
		const data = await response.text();
		return data;
	} catch (error) {
		console.error("Failed to delete image from S3:", error);
		throw error;
	}
}
