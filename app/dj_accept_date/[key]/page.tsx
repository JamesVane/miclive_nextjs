/** @format */

import DjAcceptDateSplitter from "@/DeckMobileSplitterPages/DjAcceptDateSplitter";

function page({ params }: { params: { key: string } }) {
	return <DjAcceptDateSplitter inviteUuid={params.key} />;
}

export default page;
