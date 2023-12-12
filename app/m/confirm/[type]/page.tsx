/** @format */

import React from "react";
import ConfirmPhoneAndEmail from "@mobi/StartPage/ConfirmPhoneAndEmail";

function page({
	params,
}: {
	params: { type: "promoter" | "performer" | "dj" };
}) {
	return <ConfirmPhoneAndEmail userTypeFromParams={params.type} />;
}

export default page;
