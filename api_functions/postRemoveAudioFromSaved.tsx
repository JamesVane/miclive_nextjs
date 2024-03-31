/** @format */

import axios from "axios";
import { Auth } from "aws-amplify";

export const postRemoveAudioFromSaved = async (
	audioId: number
): Promise<void> => {
	const url =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/audio/postremoveaudiofromsaved";
	const body = {
		query_audio_id: audioId,
	};
	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const response = await axios.post(url, body, {
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}
};
