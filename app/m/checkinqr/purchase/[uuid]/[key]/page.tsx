/** @format */

import React from "react";
import PurchaseTicket from "@mobi/PurchaseTicket";

function page({ params }: { params: { key: string; uuid: string } }) {
	return (
		<PurchaseTicket
			specificEventIdFromParams={params.key}
			uuidFromParams={params.uuid}
			forCheckin
		/>
	);
}

export default page;
