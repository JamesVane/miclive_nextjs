/** @format */

import React from "react";
import QuickConfirmPhoneContainer from "@mobi/QuickAccountCreation/QuickConfirmPhone/QuickConfirmPhoneContainer";

interface DjAcceptDateConfirmContainerProps {
	paramsKey: string;
}

function DjAcceptDateConfirmContainer({
	paramsKey,
}: DjAcceptDateConfirmContainerProps) {
	return (
		<QuickConfirmPhoneContainer
			userTypeFromParams="dj"
			continueUrl={`/dj_accept_date/${paramsKey}`}
			doesNotHavePassword={false}
		/>
	);
}

export default DjAcceptDateConfirmContainer;
