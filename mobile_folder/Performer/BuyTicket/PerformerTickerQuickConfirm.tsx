/** @format */

import React from "react";
import QuickConfirmPhoneContainer from "@mobi/QuickAccountCreation/QuickConfirmPhone/QuickConfirmPhoneContainer";

interface PerformerTickerQuickConfirmProps {
	specificEventId: string;
}

function PerformerTickerQuickConfirm({
	specificEventId,
}: PerformerTickerQuickConfirmProps) {
	return (
		<QuickConfirmPhoneContainer
			userTypeFromParams="performer"
			continueUrl={`/m/buy_ticket/purchase/${specificEventId}`}
		/>
	);
}

export default PerformerTickerQuickConfirm;
