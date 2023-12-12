/** @format */

export async function addDjToSpecificEventDate(
	request_dj_id: number,
	request_invite_key: string
): Promise<string> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/putadddjtospecificeventdate";

	try {
		const response = await fetch(endpoint, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				request_dj_id,
				request_invite_key,
			}),
		});

		if (!response.ok) {
			throw new Error("Failed to fetch from the API endpoint");
		}

		const responseData = await response.json();

		return responseData.message;
	} catch (error) {
		console.error("Error while adding DJ to specific event date:", error);
		throw error;
	}
}
