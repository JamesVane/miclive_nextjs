/** @format */

import React from "react";
import { SubmittedAudioType } from "@/UniversalTypes";

export async function PostPerformerChangeSubmittedAudioFromExisting(
	performerId: number,
	specificEventId: number,
	submittedAudio: SubmittedAudioType
) {
	console.log("submittedAudio:", submittedAudio);
	console.log("performerId:", performerId);
	console.log("specificEventId:", specificEventId);
	const response = await fetch(
		`https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/audio/postperformerchangesubmittedaudiofromexisting?query_performer_id=${performerId}&query_specific_event=${specificEventId}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(submittedAudio),
		}
	);

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	return await response.json();
}
