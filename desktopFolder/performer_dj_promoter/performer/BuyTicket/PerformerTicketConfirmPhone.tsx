/** @format */

import React from "react";
import QuickConfirmPhoneContainer from "@desk/QuickAccountCreation/QuickConfirmPhone/QuickConfirmPhoneContainer";

interface PerformerTicketConfirmPhoneProps {
	specific_event_id: string;
}

function PerformerTicketConfirmPhone({
	specific_event_id,
}: PerformerTicketConfirmPhoneProps) {
	return (
		<QuickConfirmPhoneContainer
			paramsType="performer"
			continueUrl={`/buy_ticket/purchase/${specific_event_id}`}
		/>
	);
}

export default PerformerTicketConfirmPhone;
