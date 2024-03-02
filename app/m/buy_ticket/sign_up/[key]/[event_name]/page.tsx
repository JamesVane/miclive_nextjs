/** @format */

import React from "react";
import PerformerTicketQuickPhoneName from "@/mobile_folder/Performer/BuyTicket/PerformerTicketQuickPhoneName";

function page({ params }: { params: { key: string; event_name: string } }) {
	return (
		<PerformerTicketQuickPhoneName
			eventName={params.event_name}
			specificeventId={params.key}
		/>
	);
}

export default page;
