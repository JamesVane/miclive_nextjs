/** @format */

// Define TypeScript interfaces for the request and response for clarity and type safety
interface UpdateUserImageResponse {
	message: string;
}

export async function putUserHasImage(
	requestUserSub: string
): Promise<UpdateUserImageResponse> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/putUserHasImage";
	const requestBody = { request_user_sub: requestUserSub };

	try {
		const response = await fetch(endpoint, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(requestBody),
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data: UpdateUserImageResponse = await response.json();
		return data;
	} catch (error) {
		throw new Error(`Failed to update user image: ${error}`);
	}
}
