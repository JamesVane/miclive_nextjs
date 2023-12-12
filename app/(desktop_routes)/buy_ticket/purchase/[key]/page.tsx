/** @format */

import React from "react";
import PurchaseTicketPage from "@desk/PurchaseTicketPage";

function page({ params }: { params: { key: string } }) {
	return <PurchaseTicketPage specificEventIdFromParams={params.key} />;
}

export default page;
