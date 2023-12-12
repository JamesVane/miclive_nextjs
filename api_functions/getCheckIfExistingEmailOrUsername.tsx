/** @format */

export async function getCheckIfExistingEmailOrUsername(
	request_email: string,
	request_username: string
): Promise<{ existingEmail: boolean; existingUsername: boolean }> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/createaccount/getcheckifexistingemailorusername";
	const queryParams = new URLSearchParams({
		request_email: request_email,
		request_username: request_username,
	});

	try {
		const response = await fetch(`${endpoint}?${queryParams.toString()}`);

		// Check if the request was successful
		if (!response.ok) {
			throw new Error("Server responded with an error");
		}

		const data = await response.json();

		return {
			existingEmail: data.matchingEmail,
			existingUsername: data.matchingUsername,
		};
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}
