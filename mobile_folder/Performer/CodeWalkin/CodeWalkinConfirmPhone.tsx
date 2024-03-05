/** @format */

import React from "react";
import QuickConfirmPhoneContainer from "@mobi/QuickAccountCreation/QuickConfirmPhone/QuickConfirmPhoneContainer";

interface CodeWalkinConfirmPhoneProps {
	key: string;
}

function CodeWalkinConfirmPhone({ key }: CodeWalkinConfirmPhoneProps) {
	return (
		<QuickConfirmPhoneContainer
			continueUrl={`/m/walkin_key/${key}`}
			userTypeFromParams="performer"
		/>
	);
}

export default CodeWalkinConfirmPhone;
