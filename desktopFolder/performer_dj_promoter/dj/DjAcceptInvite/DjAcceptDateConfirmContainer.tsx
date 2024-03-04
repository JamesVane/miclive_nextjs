/** @format */

import React from "react";
import QuickConfirmPhoneContainer from "@desk/QuickAccountCreation/QuickConfirmPhone/QuickConfirmPhoneContainer";

interface DjAcceptDateConfirmContainerProps {
	paramsKey: string;
}

function DjAcceptDateConfirmContainer({
	paramsKey,
}: DjAcceptDateConfirmContainerProps) {
	return (
		<QuickConfirmPhoneContainer
			continueUrl={`/dj_accept_date/${paramsKey}`}
			paramsType="dj"
		/>
	);
}

export default DjAcceptDateConfirmContainer;
