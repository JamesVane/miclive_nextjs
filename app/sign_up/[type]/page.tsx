/** @format */
"use client";

import React from "react";
import SignUpSplitter from "@/DeckMobileSplitterPages/SignUpSplitter";

function page({
	params,
}: {
	params: { type: "promoter" | "performer" | "dj" };
}) {
	return <SignUpSplitter userType={params.type} />;
}

export default page;
