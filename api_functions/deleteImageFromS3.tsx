/** @format */

export async function deleteImageFromS3(
	requestDeletePath: string
): Promise<string> {
	const endpoint =
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/deleteimagefroms3";
	const url = new URL(endpoint);
	url.searchParams.append("request_delete_path", requestDeletePath);

	try {
		const response = await fetch(url.toString(), { method: "DELETE" });
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}
		const data = await response.text();
		return data;
	} catch (error) {
		console.error("Failed to delete image from S3:", error);
		throw error;
	}
}
