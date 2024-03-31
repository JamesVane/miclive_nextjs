/** @format */

export type PerformerRoleAudioKeys = {
	audio_id: number;
	name: string;
	audio_length: string;
	performer_id: number;
	isInUse: boolean;
}[];

export async function getPerformerProfileAudioKeys(
	queryRole: string
): Promise<PerformerRoleAudioKeys> {
	try {
		const response = await fetch(
			`https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/audio/getperformerprofileaudiokeys?query_role=${queryRole}`
		);
		if (!response.ok) {
			throw new Error(
				`Failed to fetch performer role audio keys: ${response.status} ${response.statusText}`
			);
		}
		const audioKeys = await response.json();

		console.log("audioKeys:", audioKeys);
		return audioKeys;
	} catch (error) {
		console.error(error);
		throw error;
	}
}
