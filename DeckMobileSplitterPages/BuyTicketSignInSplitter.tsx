/** @format */

"use client";
import { isMobile } from "react-device-detect";
import SignInPage from "@desk/SignIn";
import MobileSignInPage from "@mobi/StartPage/SignInPage";

interface BuyTicketSignInSplitterProps {
	keyFromParams: string;
	eventNameFromParams: string;
}

function BuyTicketSignInSplitter({
	keyFromParams,
	eventNameFromParams,
}: BuyTicketSignInSplitterProps) {
	return (
		<>
			{isMobile ? (
				<MobileSignInPage
					isForPurchase
					keyFromParams={keyFromParams}
					eventNameFromParams={eventNameFromParams}
				/>
			) : (
				<SignInPage
					isForPurchase
					keyFromParams={keyFromParams}
					eventNameFromParams={eventNameFromParams}
				/>
			)}
		</>
	);
}

export default BuyTicketSignInSplitter;
