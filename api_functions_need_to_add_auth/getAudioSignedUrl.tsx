/** @format */

import axios, { AxiosResponse } from "axios";

export interface GetSignedUrlResponse {
	url: string;
}

export async function getAudioSignedUrl(
	query_path: string
): Promise<GetSignedUrlResponse> {
	const lambda_url =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/audio/getaudiosignedurl";

	try {
		const response: AxiosResponse<GetSignedUrlResponse> = await axios.get(
			lambda_url,
			{
				params: {
					query_path,
				},
			}
		);

		return response.data;
	} catch (error) {
		throw new Error(`Error fetching signed URL: ${error}`);
	}
}
