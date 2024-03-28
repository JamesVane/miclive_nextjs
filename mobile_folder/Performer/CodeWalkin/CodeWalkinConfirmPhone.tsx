/** @format */

import React from "react";
import QuickConfirmPhoneContainer from "@mobi/QuickAccountCreation/QuickConfirmPhone/QuickConfirmPhoneContainer";

interface CodeWalkinConfirmPhoneProps {
	key: string;
}

function CodeWalkinConfirmPhone({ key }: CodeWalkinConfirmPhoneProps) {
	return (
		<QuickConfirmPhoneContainer
			continueUrl={`/walkin_key/${key}`}
			userTypeFromParams="performer"
			doesNotHavePassword={true}
		/>
	);
}

export default CodeWalkinConfirmPhone;
