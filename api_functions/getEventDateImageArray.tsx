/** @format */

export async function getEventDateImageArray(
	requestSpecificEventId: string
): Promise<string[]> {
	const endpoint = `https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/richtext/geteventdateimagearray`;
	const url = new URL(endpoint);
	url.searchParams.set("request_specific_event_id", requestSpecificEventId);

	try {
		const response = await fetch(url.toString());
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		return data.image_array;
	} catch (error) {
		console.error("Error fetching event date image array:", error);
		throw error;
	}
}
