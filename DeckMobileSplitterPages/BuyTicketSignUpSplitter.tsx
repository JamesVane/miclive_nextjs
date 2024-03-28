/** @format */

"use client";
import { isMobile } from "react-device-detect";
import PerformerTicketSignUpNamePhone from "@desk/performer_dj_promoter/performer/BuyTicket/PerformerTicketSignUpNamePhone";
import MobilePerformerTicketQuickPhoneName from "@/mobile_folder/Performer/BuyTicket/PerformerTicketQuickPhoneName";

interface BuyTicketSignUpSplitterProps {
	eventName: string;
	eventKey: string;
}

function BuyTicketSignUpSplitter({
	eventName,
	eventKey,
}: BuyTicketSignUpSplitterProps) {
	return (
		<>
			{isMobile ? (
				<MobilePerformerTicketQuickPhoneName
					eventName={eventName}
					specificeventId={eventKey}
				/>
			) : (
				<PerformerTicketSignUpNamePhone
					eventName={eventName}
					eventKey={eventKey}
				/>
			)}
		</>
	);
}

export default BuyTicketSignUpSplitter;
