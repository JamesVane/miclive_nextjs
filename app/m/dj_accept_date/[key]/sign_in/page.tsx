/** @format */

import React from "react";
import DjAcceptInvite from "@mobi/DjAcceptInvite";

function page({ params }: { params: { key: string } }) {
	return <DjAcceptInvite isSigningIn inviteUuidFromParams={params.key} />;
}

export default page;
