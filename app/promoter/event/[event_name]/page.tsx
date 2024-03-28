/** @format */

import PromoterEventPageSplitter from "@/DeckMobileSplitterPages/PromoterEventPageSplitter";

function page({ params }: { params: { event_name: string } }) {
	return <PromoterEventPageSplitter eventName={params.event_name} />;
}

export default page;
