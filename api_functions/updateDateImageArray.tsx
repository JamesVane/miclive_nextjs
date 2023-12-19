/** @format */

export async function updateDateImageArray(
	requestSpecificEventId: string,
	imageArray: string[]
): Promise<void> {
	const endpoint = `https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/richtext/updatedateimagearray`;
	const url = new URL(endpoint);
	url.searchParams.set("request_specific_event_id", requestSpecificEventId);

	try {
		const response = await fetch(url.toString(), {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ image_array: imageArray }),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		console.log("Update successful");
	} catch (error) {
		console.error("Error updating event date image array:", error);
	}
}
