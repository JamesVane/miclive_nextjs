/** @format */

"use client";
import { isMobile } from "react-device-detect";
import PurchaseTicketPage from "@desk/PurchaseTicketPage";
import MobilePurchaseTicket from "@mobi/PurchaseTicket";

interface BuyTicketPurchaseSplitterProps {
	specificEventIdFromParams: string;
}

function BuyTicketPurchaseSplitter({
	specificEventIdFromParams,
}: BuyTicketPurchaseSplitterProps) {
	return (
		<>
			{isMobile ? (
				<MobilePurchaseTicket
					specificEventIdFromParams={specificEventIdFromParams}
				/>
			) : (
				<PurchaseTicketPage
					specificEventIdFromParams={specificEventIdFromParams}
				/>
			)}
		</>
	);
}

export default BuyTicketPurchaseSplitter;
