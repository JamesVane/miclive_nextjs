/** @format */
import ConfirmPhoneAndEmail from "@desk/ConfirmPhoneAndEmail";

import React from "react";

function page({ params }: { params: { key: string } }) {
	return <ConfirmPhoneAndEmail paramsType="performer" paramsKey={params.key} />;
}

export default page;
