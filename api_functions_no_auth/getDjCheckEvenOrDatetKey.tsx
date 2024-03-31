/** @format */

const API_URL =
	"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getcheckdjinvitekey";

type getDjCheckDateKeyResponse = {
	DjDateInviteUrlKey: string;
	Value: {
		specificEventId: number;
		baseEventId: number;
		baseEventTagline: string;
		baseEventName: string;
		startTime: string;
		location: string;
		endTime: string;
	};
};

export async function getDjCheckDateKey(
	request_uuid: string
): Promise<getDjCheckDateKeyResponse> {
	const response = await fetch(`${API_URL}?request_uuid=${request_uuid}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data: getDjCheckDateKeyResponse = await response.json();

	return data;
}
