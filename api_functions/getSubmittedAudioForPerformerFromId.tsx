/** @format */
import { SubmittedAudioType } from "@/UniversalTypes";

interface getSubmittedAudioForPerformerFromIdInput {
	requestPerformerId: string;
	requestSpecificEventId: string;
}

export async function getSubmittedAudioForPerformerFromId({
	requestPerformerId,
	requestSpecificEventId,
}: getSubmittedAudioForPerformerFromIdInput): Promise<SubmittedAudioType | null> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getsubmittedaudioforperformerfromid";
	const queryParams = new URLSearchParams({
		request_performer_id: requestPerformerId,
		request_specific_event_id: requestSpecificEventId,
	});

	try {
		const response = await fetch(`${endpoint}?${queryParams}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data.submitted_audio as SubmittedAudioType;
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
}
