/** @format */

import React from "react";
import ConfirmPhoneAndEmail from "@desk/ConfirmPhoneAndEmail";

function page({ params }: { params: { type: string } }) {
	return <ConfirmPhoneAndEmail paramsType={params.type} />;
}

export default page;
