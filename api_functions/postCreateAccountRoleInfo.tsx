/** @format */

import axios from "axios";

interface AccountRoleInfo {
	has_no_image: boolean;
	request_tagline: string;
	request_sub: string;
	request_user_type: "performer" | "promoter" | "dj";
	request_city?: string | null;
	request_phone?: string | null;
	request_email?: string | null;
	request_ig?: string | null;
	request_website?: string | null;
	request_performer_role_key: number | null;
}

export async function postCreateAccountRoleInfo(
	data: AccountRoleInfo
): Promise<any> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/createaccount/postcreateaccountroleinfo";

	try {
		const response = await axios.post(endpoint, data);

		// Assuming the response contains a 'data' property which holds the parsed JSON
		if (response.data && response.data.request_image_path) {
			return {
				message: response.data.message,
				request_image_path: response.data.request_image_path,
				new_id: response.data.new_id,
			};
		}

		return {
			data: response.data,
			new_id: response.data.new_id,
		}; // Return the entire data if `request_image_path` is not available
	} catch (error) {
		throw new Error(`Failed to post data to the API: ${error}`);
	}
}
