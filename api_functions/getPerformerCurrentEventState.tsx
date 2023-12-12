/** @format */
import { Auth } from "aws-amplify";

export async function getPerformerCurrentEventState(
	request_specific_event_id: number
): Promise<any> {
	const user = await Auth.currentAuthenticatedUser();
	const roleId = user.attributes["custom:RoleId"];
	const request_performer_id =
		typeof roleId === "string" ? parseInt(roleId) : roleId;

	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getperformercurrenteventstate";

	const url = new URL(endpoint);
	url.searchParams.set("request_performer_id", request_performer_id.toString());
	url.searchParams.set(
		"request_specific_event_id",
		request_specific_event_id.toString()
	);

	try {
		const response = await fetch(url.toString());

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();

		return data;
	} catch (error: any) {
		console.error(
			"There was a problem with the fetch operation:",
			error.message
		);
		throw error;
	}
}
