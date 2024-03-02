/** @format */

import React from "react";
import PerformerTickerQuickConfirm from "@mobi/Performer/BuyTicket/PerformerTickerQuickConfirm";

function page({ params }: { params: { key: string } }) {
	return <PerformerTickerQuickConfirm specificEventId={params.key} />;
}

export default page;
