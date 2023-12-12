/** @format */

import React from "react";
import PurchaseTicket from "@mobi/PurchaseTicket";

function page({ params }: { params: { key: string } }) {
	return <PurchaseTicket specificEventIdFromParams={params.key} />;
}

export default page;
