/** @format */

import DjManageEventSplitter from "@/DeckMobileSplitterPages/DjManageEventSplitter";

function page({ params }: { params: { id: string } }) {
	return <DjManageEventSplitter specificEventId={params.id} />;
}

export default page;
