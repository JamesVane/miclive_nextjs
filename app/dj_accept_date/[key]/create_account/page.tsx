/** @format */

import DjAcceptDateCreateAccountSplitter from "@/DeckMobileSplitterPages/DjAcceptDateCreateAccountSplitter";

function page({ params }: { params: { key: string } }) {
	return <DjAcceptDateCreateAccountSplitter paramsKey={params.key} />;
}

export default page;
