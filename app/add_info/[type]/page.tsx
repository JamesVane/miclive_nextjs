/** @format */

import React from "react";
import AddInitialAccountInfo from "@desk/AddInitialAccountInfo";
import AddInfoSplitter from "@/DeckMobileSplitterPages/AddInfoSplitter";

function page({
	params,
}: {
	params: { type: "promoter" | "performer" | "dj" };
}) {
	return <AddInfoSplitter paramsType={params.type} />;
}

export default page;
