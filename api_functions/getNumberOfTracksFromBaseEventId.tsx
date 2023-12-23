/** @format */

export async function getNumberOfTracksFromBaseEventId(
	requestSpecificEventId: string
): Promise<{
	songs_per_performer: number;
	time_per_performer: string;
} | null> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/tempaccount/getnumberoftracksfrombaseeventid";
	try {
		const response = await fetch(
			`${endpoint}?request_specific_event_id=${encodeURIComponent(
				requestSpecificEventId
			)}`
		);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		return null;
	}
}
