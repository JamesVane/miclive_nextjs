/** @format */

import React from "react";
import QuickCreatePhoneNameContainer from "@mobi/QuickAccountCreation/QuickCreatePhoneName/QuickCreatePhoneNameContainer";

interface DjAcceptDateCreateAccountContainerProps {
	paramsKey: string;
}

function DjAcceptDateCreateAccountContainer({
	paramsKey,
}: DjAcceptDateCreateAccountContainerProps) {
	return (
		<QuickCreatePhoneNameContainer
			userTypeFromParams="dj"
			continuePath={`/m/dj_accept_date/${paramsKey}/confirm`}
			cancelPath={`/m/dj_accept_date/${paramsKey}`}
		/>
	);
}

export default DjAcceptDateCreateAccountContainer;
