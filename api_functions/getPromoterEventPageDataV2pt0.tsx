/** @format */

import axios from "axios";
import { EventPageData } from "../store/PromoterEventPageV2pt0Slice";
import { Auth } from "aws-amplify";

export const getPromoterEventPageDataV2pt0 = async (
	eventName: string
): Promise<EventPageData | null> => {
	try {
		const currentUser = await Auth.currentAuthenticatedUser();
		const authToken = currentUser.signInUserSession.idToken.jwtToken;
		const apuEndpoint =
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/promoter/getpromotereventpagedatav2pt0";
		const response = await axios.get<EventPageData>(apuEndpoint, {
			params: { request_event_name: eventName },
			headers: {
				Authorization: `Bearer ${authToken}`,
			},
		});

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			console.log(error.response.data);
			return null;
		} else {
			console.log("An unexpected error occurred");
			return null;
		}
	}
};
