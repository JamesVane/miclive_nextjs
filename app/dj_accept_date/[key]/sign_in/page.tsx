/** @format */

import DjAcceptDateSignInSplitter from "@/DeckMobileSplitterPages/DjAcceptDateSignInSplitter";

function page({ params }: { params: { key: string } }) {
	return <DjAcceptDateSignInSplitter inviteUuid={params.key} />;
}

export default page;
