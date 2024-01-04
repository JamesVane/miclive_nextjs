/** @format */

interface PerformerQueuePosition {
	request_performer_role_id: number;
	request_cue_position: number;
}

interface putChangePerformerQueuePositionForDNDProps {
	requestSpecificEventId: string;
	performerQueuePositions: PerformerQueuePosition[];
}

export async function putChangePerformerQueuePositionForDND({
	requestSpecificEventId,
	performerQueuePositions,
}: putChangePerformerQueuePositionForDNDProps): Promise<boolean> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/putchangeperformerqueuepositionfordnd";

	const queryParams = new URLSearchParams({
		request_specific_event_id: requestSpecificEventId,
	});

	try {
		const response = await fetch(`${endpoint}?${queryParams.toString()}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(performerQueuePositions),
		});

		if (response.ok) {
			return true;
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}
}
