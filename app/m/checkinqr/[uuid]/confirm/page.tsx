/** @format */

import React from "react";
import ConfirmPhoneAndEmail from "@mobi/StartPage/ConfirmPhoneAndEmail";

function page({ params }: { params: { uuid: string } }) {
	return (
		<ConfirmPhoneAndEmail
			userTypeFromParams="performer"
			uuidFromParams={params.uuid}
			forPerformerQr
		/>
	);
}

export default page;
