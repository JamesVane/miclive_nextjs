/** @format */

import axios from "axios";

interface GetSignedUrlResponse {
	url: string;
}

export async function getSignedUrl(
	type:
		| "performer"
		| "promoter"
		| "dj"
		| "event"
		| "qr"
		| "event4X1"
		| "event3X1"
		| "promoter3X1"
		| "promoter4X1",
	id: string
): Promise<string | null> {
	let path = "";

	switch (type) {
		case "promoter3X1":
			path = `promoter_banner_3X1/banner_${id}`;
			break;
		case "promoter4X1":
			path = `promoter_banner_4X1/banner_${id}`;
			break;
		case "event4X1":
			path = `event_banner_4X1/banner_${id}`;
			break;
		case "event3X1":
			path = `event_banner_3X1/banner_${id}`;
			break;
		case "performer":
			path = `performer_pictures/performer_${id}.jpg`;
			break;
		case "qr":
			path = `${id}.png`;
			break;
		case "promoter":
			path = `promoter_pictures/promoter_${id}.jpg`;
			break;
		case "dj":
			path = `dj_pictures/dj_${id}.jpg`;
			break;
		case "event":
			path = `event_pictures/event_${id}.jpg`;
			break;
		default:
			throw new Error("Invalid type provided");
	}

	try {
		const response = await axios.get<GetSignedUrlResponse>(
			"https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/getanysignedurl",
			{
				params: {
					path,
					bucket: type === "qr" ? "checkinqrcodes" : "miclivedevuserphotos",
				},
			}
		);

		return response.data.url;
	} catch (error) {
		console.error("Error fetching signed URL:", error);
		return null;
	}
}
