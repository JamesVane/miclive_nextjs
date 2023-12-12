/** @format */

import React from "react";

export const putDjNextPerformer = async (
	specificEventId: number,
	cuePosition: number
) => {
	const response = await fetch(
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/djmanageevent/putdjnextperformer",
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				request_specific_event_id: specificEventId,
				request_cue_position: cuePosition,
			}),
		}
	);

	if (!response.ok) {
		throw new Error("HTTP error " + response.status);
	}

	return await response.json();
};
