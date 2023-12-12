/** @format */

export async function putEditBaseEventDescription(
	baseEventId: number,
	baseDescription: string
): Promise<void> {
	const url =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/editevent/puteditbaseeventdescription";
	const body = {
		requestBaseEventId: baseEventId,
		requestDescription: baseDescription,
	};

	const response = await fetch(url, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}

	const responseData = await response.json();
	console.log(responseData.message);
}
