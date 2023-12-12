/** @format */

import React from "react";
import AddAccountLinks from "@desk/AddAccountLinks";

function page({
	params,
}: {
	params: { type: "performer" | "promoter" | "dj" };
}) {
	return <AddAccountLinks paramsType={params.type} />;
}

export default page;
