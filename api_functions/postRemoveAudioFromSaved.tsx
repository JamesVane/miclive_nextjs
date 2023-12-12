/** @format */

import axios from "axios";

export const postRemoveAudioFromSaved = async (
	audioId: number,
	performerId: number
): Promise<void> => {
	const url =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/audio/postremoveaudiofromsaved";
	const body = {
		query_audio_id: audioId,
		query_performer_id: performerId,
	};
	try {
		const response = await axios.post(url, body);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
};
