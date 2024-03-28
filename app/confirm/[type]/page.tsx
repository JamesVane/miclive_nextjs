/** @format */

import React from "react";
import ConfirmSplitter from "@/DeckMobileSplitterPages/ConfirmSplitter";

function page({
	params,
}: {
	params: { type: "promoter" | "performer" | "dj" };
}) {
	return <ConfirmSplitter type={params.type} />;
}

export default page;
