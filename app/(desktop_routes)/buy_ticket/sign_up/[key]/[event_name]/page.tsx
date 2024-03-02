/** @format */

import React from "react";
import CreateAccount from "@desk/CreateAccount";
import PerformerTicketSignUpNamePhone from "@desk/performer_dj_promoter/performer/BuyTicket/PerformerTicketSignUpNamePhone";

function page({ params }: { params: { key: string; event_name: string } }) {
	return (
		<PerformerTicketSignUpNamePhone
			eventName={params.event_name}
			eventKey={params.key}
		/>
	);
}

export default page;
