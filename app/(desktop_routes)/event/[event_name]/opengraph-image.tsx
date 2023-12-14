/** @format */

import { ImageResponse } from "next/og";
import { getEventMetadata } from "@/api_functions/getEventMetadata";

export const runtime = "edge";

export const alt = "About Acme";
export const size = {
	width: 1200,
	height: 400,
};
export const contentType = "image/png";

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
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
				}}>
				{
					<img
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
							display: "flex",
						}}
						src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_3X1/banner_${eventMetadata.base_event_id}`}
					/>
				}
			</div>
		),
		{
			width: 1200,
			height: 400,
		}
	);
}
