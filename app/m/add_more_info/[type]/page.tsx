/** @format */

import React from "react";
import AddAccountLinks from "@mobi/StartPage/AddAccountLinks";

function page({
	params,
}: {
	params: { type: "promoter" | "performer" | "dj" };
}) {
	return <AddAccountLinks userTypeFromParams={params.type} />;
}

export default page;
