/** @format */
import axios from "axios";
import { Auth } from "aws-amplify";

interface MakeAnnouncementRequest {
	request_specific_event_id: string;
	request_message: string;
	request_queue_position: number;
	request_sender_name: string;
}

interface MakeAnnouncementResponse {
	message: string;
}

export async function postMakeAnnouncement({
	request_specific_event_id,
	request_message,
	request_queue_position,
	request_sender_name,
}: MakeAnnouncementRequest): Promise<MakeAnnouncementResponse> {
	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;

		const response = await axios.post<MakeAnnouncementResponse>(
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/postMakeAnnouncement",
			{
				request_specific_event_id: request_specific_event_id,
				request_message: request_message,
				request_queue_position: request_queue_position,
				request_sender_name: request_sender_name,
			},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${authToken}`,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error making announcement:", error);
		throw error;
	}
}
