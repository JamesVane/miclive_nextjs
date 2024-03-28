/** @format */

import BuyTicketConfirmSplitter from "@/DeckMobileSplitterPages/BuyTicketConfirmSplitter";

import React from "react";

function page({ params }: { params: { key: string } }) {
	return <BuyTicketConfirmSplitter specificEventId={params.key} />;
}

export default page;
