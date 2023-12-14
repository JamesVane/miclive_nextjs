/** @format */

type EventMetadata = {
	base_event_id?: number;
	event_name?: string;
	event_tagline?: string;
	error?: string;
};

export async function getEventMetadata(
	requestEventNameSlug: string
): Promise<EventMetadata> {
	const endpoint = `https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/metadata/geteventmetadata`;
	const url = new URL(endpoint);
	url.searchParams.set("request_event_name_slug", requestEventNameSlug);

	try {
		const response = await fetch(url.toString());
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data: EventMetadata = await response.json();
		return data;
	} catch (error) {
		console.error("Error fetching event metadata:", error);
		return { error: error instanceof Error ? error.message : String(error) };
	}
}
