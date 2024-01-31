/** @format */

interface PostData {
	request_dj_sub: string;
	request_performer_id: string;
	request_specific_event_id: string;
	request_audio_key: string;
	request_audio_value: {
		audioName: string;
		audioKey: string;
		length: number;
	};
}

export async function postSocketPerformerChangedAudioForCurrentEventToDj(
	data: PostData
): Promise<void> {
	const url =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/djmanageevent/postSocketPerformerChangedAudioForCurrentEventToDj";

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const responseData = await response.json();
		console.log("Response:", responseData);
	} catch (error) {
		console.error("Error posting to Lambda function:", error);
	}
}
