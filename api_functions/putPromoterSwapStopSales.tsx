/** @format */

interface UpdateEventSalesStatusRequest {
	query_specific_event_id: number;
}

export async function putPromoterSwapStopSales(
	request: UpdateEventSalesStatusRequest
): Promise<any> {
	const response = await fetch(
		"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/djmanageevent/putpromoterswapstopsales",
		{
			method: "PUT",
			body: JSON.stringify(request),
			headers: {
				"Content-Type": "application/json",
			},
		}
	);

	if (!response.ok) {
		const message = await response.text();
		throw new Error(`Failed to update event sales status: ${message}`);
	}
	return response;
}
