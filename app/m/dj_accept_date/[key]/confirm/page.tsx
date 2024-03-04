/** @format */

import React from "react";
import DjAcceptDateConfirmContainer from "@mobi/DjAcceptInvite/DjAcceptDateConfirmContainer";

function page({ params }: { params: { key: string } }) {
	return <DjAcceptDateConfirmContainer paramsKey={params.key} />;
}

export default page;
