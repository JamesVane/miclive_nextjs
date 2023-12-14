/** @format */

import { ImageResponse } from "next/og";
import { getEventMetadata } from "@/api_functions/getEventMetadata";
import NextImage from "next/image";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "About Acme";
export const size = {
	width: 600,
	height: 600,
};

export const contentType = "image/png";

// Image generation
export default async function Image({
	params,
}: {
	params: { event_name: string };
}) {
	const eventMetadata = await getEventMetadata(params.event_name);

	return new ImageResponse(
		(
			<div
				style={{
					width: "100%",
					height: "100%",
					fontSize: "40px",
					backgroundColor: "teal",
				}}>
				foofoo
			</div>
		)
	);
}

{
	/* <NextImage
				src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${eventMetadata.base_event_id}.jpg`}
				alt="Event Image"
				style={{
					width: "100%",
					height: "100%",
					objectFit: "cover",
				}}
			/> */
}
