/** @format */

import React from "react";
import ConfirmPhoneAndEmail from "@desk/ConfirmPhoneAndEmail";

function page({ params }: { params: { key: string } }) {
	return (
		<ConfirmPhoneAndEmail
			paramsType="dj"
			paramsKey={params.key}
			forDjEventInvite
		/>
	);
}

export default page;
