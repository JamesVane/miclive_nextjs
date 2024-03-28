/** @format */

import PromoterCreateDateSplitter from "@/DeckMobileSplitterPages/PromoterCreateDateSplitter";

function page({ params }: { params: { id: string } }) {
	return <PromoterCreateDateSplitter baseEventIdFromParams={params.id} />;
}

export default page;
