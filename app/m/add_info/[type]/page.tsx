/** @format */

import React from "react";
import AddInitialAccountInfo from "@mobi/StartPage/AddInitialAccountInfo";

function page({
	params,
}: {
	params: { type: "promoter" | "performer" | "dj" };
}) {
	return <AddInitialAccountInfo userTypeFromParams={params.type} />;
}

export default page;
