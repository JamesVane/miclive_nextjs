/** @format */

import DjAcceptDateConfirmSplitter from "@/DeckMobileSplitterPages/DjAcceptDateConfirmSplitter";

function page({ params }: { params: { key: string } }) {
	return <DjAcceptDateConfirmSplitter paramsKey={params.key} />;
}

export default page;
