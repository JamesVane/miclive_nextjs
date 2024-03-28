/** @format */

"use client";
import { isMobile } from "react-device-detect";
import PerformerTicketConfirmPhone from "@desk/performer_dj_promoter/performer/BuyTicket/PerformerTicketConfirmPhone";
import MobilePerformerTickerQuickConfirm from "@mobi/Performer/BuyTicket/PerformerTickerQuickConfirm";

interface BuyTicketConfirmSplitterProps {
	specificEventId: string;
}

function BuyTicketConfirmSplitter({
	specificEventId,
}: BuyTicketConfirmSplitterProps) {
	return (
		<>
			{isMobile ? (
				<MobilePerformerTickerQuickConfirm specificEventId={specificEventId} />
			) : (
				<PerformerTicketConfirmPhone specific_event_id={specificEventId} />
			)}
		</>
	);
}

export default BuyTicketConfirmSplitter;
