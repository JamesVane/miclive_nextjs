/** @format */

import React from "react";
import DjAcceptInvite from "@desk/performer_dj_promoter/dj/DjAcceptInvite";

function page({ params }: { params: { key: string } }) {
	return <DjAcceptInvite inviteUuid={params.key} />;
}

export default page;
