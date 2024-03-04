/** @format */

import React from "react";
import DjAcceptDateCreateAccountContainer from "@mobi/DjAcceptInvite/DjAcceptDateCreateAccountContainer";

function page({ params }: { params: { key: string } }) {
	return <DjAcceptDateCreateAccountContainer paramsKey={params.key} />;
}

export default page;
