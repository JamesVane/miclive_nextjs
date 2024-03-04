/** @format */

import React from "react";
import QuickSignUpNamePhoneContainer from "@/desktopFolder/QuickAccountCreation/QuickNamePhone/QuickSignUpNamePhoneContainer";

interface AcceptDateCreateAccountContainerProps {
	paramsKey: string;
}

function AcceptDateCreateAccountContainer({
	paramsKey,
}: AcceptDateCreateAccountContainerProps) {
	return (
		<QuickSignUpNamePhoneContainer
			userType="dj"
			backUrl={`/dj_accept_date/${paramsKey}`}
			nextUrl={`/dj_accept_date/${paramsKey}/confirm`}
		/>
	);
}

export default AcceptDateCreateAccountContainer;
