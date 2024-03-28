/** @format */

import BuyTicketSignInSplitter from "@/DeckMobileSplitterPages/BuyTicketSignInSplitter";

function page({ params }: { params: { key: string; event_name: string } }) {
	return (
		<BuyTicketSignInSplitter
			keyFromParams={params.key}
			eventNameFromParams={params.event_name}
		/>
	);
}

export default page;
