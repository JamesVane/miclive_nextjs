/** @format */

import { QueryFunctionContext } from "@tanstack/react-query";
import { Auth } from "aws-amplify";

export async function getNotAddedToRosterCurrentEventInfo({
	queryKey,
}: QueryFunctionContext<
	[
		string,
		{
			requestSpecificEventId: number;
		}
	]
>): Promise<{
	time_per_performer: number;
	location: {
		name: string;
		cords: {
			lat: number;
			lng: number;
		};
	};
	base_event_id: number;
	checked_in: boolean;
	end_time: number;
	start_time: number;
	submitted_audio: any;
	pre_checked_in: boolean;
	base_event_name: string;
} | null> {
	const endpoint = `https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getNotAddedToRosterCurrentEventInfo`;
	const requestSpecificEventId = queryKey[1].requestSpecificEventId;
	const user = await Auth.currentAuthenticatedUser();
	const requestPerformerRoleId = user.attributes["custom:RoleId"];
	const queryParams = new URLSearchParams({
		request_specific_event_id: requestSpecificEventId.toString(),
		request_performer_role_id: requestPerformerRoleId,
	});

	try {
		const response = await fetch(`${endpoint}?${queryParams}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		console.log(data);
		return data.return_object;
	} catch (error) {
		console.error(`Could not get event info: ${error}`);
		return null;
	}
}
