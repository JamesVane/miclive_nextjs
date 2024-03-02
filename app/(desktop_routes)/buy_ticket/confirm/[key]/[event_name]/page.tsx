/** @format */

import PerformerTicketConfirmPhone from "@desk/performer_dj_promoter/performer/BuyTicket/PerformerTicketConfirmPhone";

import React from "react";

function page({ params }: { params: { key: string; event_name: string } }) {
	return <PerformerTicketConfirmPhone specific_event_id={params.key} />;
}

export default page;
