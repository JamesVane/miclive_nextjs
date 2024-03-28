/** @format */
"use client";

import PromoterManageEventSplitter from "@/DeckMobileSplitterPages/PromoterManageEventSplitter";

function page({ params }: { params: { specific_event_id: string } }) {
	return (
		<PromoterManageEventSplitter specificEventId={params.specific_event_id} />
	);
}

export default page;
