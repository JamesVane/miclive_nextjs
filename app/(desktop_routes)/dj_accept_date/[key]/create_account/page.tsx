/** @format */

import React from "react";
import AcceptDateCreateAccountContainer from "@desk/performer_dj_promoter/dj/DjAcceptInvite/AcceptDateCreateAccountContainer";

function page({ params }: { params: { key: string } }) {
	return <AcceptDateCreateAccountContainer paramsKey={params.key} />;
}

export default page;
