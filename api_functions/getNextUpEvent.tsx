/** @format */

interface EventResponse {
	event_id?: number;
	start_time?: string;
	message?: string;
}

export const getNextUpEvent = async (
	requestUserId: string
): Promise<EventResponse> => {
	try {
		const response = await fetch(
			`https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getNextUpEvent?request_user_id=${requestUserId}`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			throw new Error("Network response was not ok");
		}

		const data: EventResponse = await response.json();

		return data;
	} catch (error) {
		console.error("Error fetching next up event:", error);
		return { message: "An error occurred while fetching the event data." };
	}
};
