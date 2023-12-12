/** @format */

export async function checkDjInviteDateOverlap(
	request_dj_id: number,
	request_start_time: string,
	request_end_time: string
): Promise<boolean> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getcheckdjinvitedateoverlap";
	const url = new URL(endpoint);

	// Add query parameters
	url.searchParams.append("request_dj_id", request_dj_id.toString());
	url.searchParams.append("request_start_time", request_start_time);
	url.searchParams.append("request_end_time", request_end_time);

	try {
		const response = await fetch(url.toString());

		// Ensure we received a successful response
		if (!response.ok) {
			throw new Error("Failed to fetch from the API endpoint");
		}

		const responseData = await response.json();

		// Assuming the lambda response body contains an 'overlap' key
		return responseData.overlap;
	} catch (error) {
		console.error("Error while checking DJ invite date overlap:", error);
		throw error;
	}
}
