/** @format */

import React from "react";
import QuickConfirmPhoneContainer from "@mobi/QuickAccountCreation/QuickConfirmPhone/QuickConfirmPhoneContainer";

interface QRWalkinConfirmPhoneProps {
	uuid: string;
}

function QRWalkinConfirmPhone({ uuid }: QRWalkinConfirmPhoneProps) {
	return (
		<QuickConfirmPhoneContainer
			userTypeFromParams="performer"
			continueUrl={`/m/checkinqr/${uuid}`}
			doesNotHavePassword={true}
		/>
	);
}

export default QRWalkinConfirmPhone;
