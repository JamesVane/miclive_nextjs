/** @format */

type ApiResponse = {
	message?: string;
	error?: string;
};

export async function putSetOpened(
	request_partition_key: string
): Promise<ApiResponse> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/messages/putsetopened";
	const body = {
		request_partition_key: request_partition_key,
	};

	try {
		const response = await fetch(endpoint, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});

		if (response.ok) {
			const data: ApiResponse = await response.json();
			return data;
		} else {
			const errorData: ApiResponse = await response.json();
			throw new Error(errorData.error || "API call failed");
		}
	} catch (error: any) {
		console.error("Error:", error);
		return { error: error.message };
	}
}
