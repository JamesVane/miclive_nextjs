/** @format */

import React from "react";
import ConfirmPhoneAndEmail from "@mobi/StartPage/ConfirmPhoneAndEmail";

function page({ params }: { params: { key: string } }) {
	return (
		<ConfirmPhoneAndEmail
			keyFromParams={params.key}
			userTypeFromParams="performer"
			forPerformerKeyCheckin
		/>
	);
}

export default page;
