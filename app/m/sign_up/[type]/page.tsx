/** @format */

import React from "react";
import CreateAccount from "@mobi/StartPage/CreateAccount";

function page({
	params,
}: {
	params: { type: "promoter" | "performer" | "dj" };
}) {
	return <CreateAccount userTypeFromParams={params.type} />;
}

export default page;
