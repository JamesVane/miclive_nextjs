/** @format */

import BuyTicketPurchaseSplitter from "@/DeckMobileSplitterPages/BuyTicketPurchaseSplitter";

function page({ params }: { params: { key: string } }) {
	return <BuyTicketPurchaseSplitter specificEventIdFromParams={params.key} />;
}

export default page;
