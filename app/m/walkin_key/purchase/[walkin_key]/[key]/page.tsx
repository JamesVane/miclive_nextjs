/** @format */

import React from "react";
import PurchaseTicket from "@mobi/PurchaseTicket";

function page({ params }: { params: { key: string; walkin_key: string } }) {
	return (
		<PurchaseTicket
			walkinKeyFromParams={params.walkin_key}
			specificEventIdFromParams={params.key}
			forKeyCheckIn
		/>
	);
}

export default page;
