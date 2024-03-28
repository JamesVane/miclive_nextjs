/** @format */

import BuyTicketSignUpSplitter from "@/DeckMobileSplitterPages/BuyTicketSignUpSplitter";

function page({ params }: { params: { key: string; event_name: string } }) {
	return (
		<BuyTicketSignUpSplitter
			eventName={params.event_name}
			eventKey={params.key}
		/>
	);
}

export default page;
