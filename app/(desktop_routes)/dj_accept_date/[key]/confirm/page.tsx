/** @format */

import React from "react";
import ConfirmPhoneAndEmail from "@desk/ConfirmPhoneAndEmail";
import DjAcceptDateConfirmContainer from "@desk/performer_dj_promoter/dj/DjAcceptInvite/DjAcceptDateConfirmContainer";

function page({ params }: { params: { key: string } }) {
	return <DjAcceptDateConfirmContainer paramsKey={params.key} />;
}

export default page;
