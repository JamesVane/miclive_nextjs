/** @format */

import React from "react";
import QuickCreatePhoneNameContainer from "@mobi/QuickAccountCreation/QuickCreatePhoneName/QuickCreatePhoneNameContainer";

interface PerformerTicketQuickPhoneNameProps {
	eventName: string;
	specificeventId: string;
}

function PerformerTicketQuickPhoneName({
	eventName,
	specificeventId,
}: PerformerTicketQuickPhoneNameProps) {
	return (
		<QuickCreatePhoneNameContainer
			cancelPath={`/m/event/${eventName}/${specificeventId}`}
			continuePath={`/m/buy_ticket/confirm/${specificeventId}`}
			userTypeFromParams="performer"
		/>
	);
}

export default PerformerTicketQuickPhoneName;
