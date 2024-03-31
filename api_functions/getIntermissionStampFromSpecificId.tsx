/** @format */
import { QueryFunctionContext } from "@tanstack/react-query";
import { SubmittedAudioType } from "@/UniversalTypes";
import { Auth } from "aws-amplify";

export async function getIntermissionStampFromSpecificId({
	queryKey,
}: QueryFunctionContext<
	[
		string,
		{
			request_specific_event_id: number | null;
		}
	]
>): Promise<string | null> {
	const requestSpecificEventId = queryKey[1].request_specific_event_id;

	if (requestSpecificEventId) {
		try {
			const currentUser = await Auth.currentAuthenticatedUser();
			const authToken = currentUser.signInUserSession.idToken.jwtToken;
			const endpoint =
				"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getIntermissionStampFromSpecificId";

			const url = new URL(endpoint);
			url.searchParams.set(
				"request_specific_event_id",
				requestSpecificEventId.toString()
			);

			try {
				const response = await fetch(url.toString(), {
					headers: {
						Authorization: `Bearer ${authToken}`,
					},
				});

				if (!response.ok) {
					throw new Error(`HTTP error! Status: ${response.status}`);
				}

				const data = await response.json();

				return data.stamp;
			} catch (error: any) {
				console.error(
					"There was a problem with the fetch operation:",
					error.message
				);
				throw error;
			}
		} catch {
			return null;
		}
	} else {
		return null;
	}
}
