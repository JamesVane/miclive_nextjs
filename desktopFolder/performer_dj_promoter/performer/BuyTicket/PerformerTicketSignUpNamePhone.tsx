/** @format */

import React from "react";
import QuickSignUpNamePhoneContainer from "@/desktopFolder/QuickAccountCreation/QuickNamePhone/QuickSignUpNamePhoneContainer";

interface PerformerTicketSignUpNamePhoneProps {
	eventName: string;
	eventKey: string;
}

function PerformerTicketSignUpNamePhone({
	eventName,
	eventKey,
}: PerformerTicketSignUpNamePhoneProps) {
	return (
		<QuickSignUpNamePhoneContainer
			backUrl={`/event/${eventName}/${eventKey}`}
			nextUrl={`/buy_ticket/confirm/${eventKey}/${eventName}`}
			userType="performer"
		/>
	);
}

export default PerformerTicketSignUpNamePhone;
