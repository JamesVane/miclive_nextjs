/** @format */

// api.ts
import axios, { AxiosResponse } from "axios";

export interface PostAudioResponse {
	message: string;
	presigned_url: string;
	s3_key: string;
}

export async function postAudio(
	performerId: number,
	audioName: string,
	audioLength: number,
	audioFile: File
): Promise<PostAudioResponse> {
	const url = `https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/audio/postaudio`;

	const queryParams = new URLSearchParams({
		query_performer_id: performerId.toString(),
		query_audio_name: audioName,
		query_audio_length: audioLength.toString(),
		query_content_type: audioFile.type,
	});

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
		params: queryParams,
	};

	const response: AxiosResponse<PostAudioResponse> = await axios.post(
		url,
		null,
		config
	);

	const { presigned_url, s3_key } = response.data;

	const uploadConfig = {
		headers: {
			"Content-Type": audioFile.type,
		},
	};

	await axios.put(presigned_url, audioFile, uploadConfig);

	return {
		message: "Audio file uploaded successfully",
		presigned_url,
		s3_key,
	};
}
