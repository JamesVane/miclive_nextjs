/** @format */
"use client";

import { useEffect, useState } from "react";
import PurchaseTicket from "./PurchaseTicket";
import { useRouter } from "next/navigation";
import { addPerformerToRoster } from "@/api_functions/postAddPerformerToRoster";
import { Auth } from "aws-amplify";
import SplashPage from "@/SplashPage";
import {
	getPageDataForPurchasePage,
	PurchasePageData,
} from "@/api_functions/getPageDataForPurchasePage";

interface PurchaseTicketContainerProps {
	forCheckin?: boolean;
	forKeyCheckIn?: boolean;
	specificEventIdFromParams: string;
	uuidFromParams?: string;
	walkinKeyFromParams?: string;
}

function PurchaseTicketContainer({
	forCheckin,
	forKeyCheckIn,
	specificEventIdFromParams,
	uuidFromParams,
	walkinKeyFromParams,
}: PurchaseTicketContainerProps) {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [isPurchasing, setIsPurchasing] = useState(false);
	const [pageData, setPageData] = useState<PurchasePageData>(
		{} as PurchasePageData
	);

	async function addToRoster() {
		const user = await Auth.currentAuthenticatedUser();
		const roleId = user.attributes["custom:RoleId"];

		console.log("Number(specificEventId)", Number(specificEventIdFromParams));
		console.log("Number(roleId)", Number(roleId));

		addPerformerToRoster({
			request_performer_id: Number(roleId),
			request_specific_event_id: Number(specificEventIdFromParams),
		});
	}

	function handlePurchaseTicket() {
		setIsPurchasing(true);
		addToRoster().then(() => {
			const eventNameSlug = pageData.name
				.trim()
				.replace(/\s+/g, "")
				.toLowerCase();
			if (forCheckin) {
				router.push(`/checkinqr/${uuidFromParams}`);
			} else if (forKeyCheckIn) {
				router.push(`/walkin_key/${walkinKeyFromParams}`);
			} else {
				router.push(
					`/event/${eventNameSlug}/${pageData.specific_event_id}/ticket`
				);
			}
			setIsPurchasing(false);
		});
	}

	function handleBack() {
		const eventNameSlug = pageData.name
			.trim()
			.replace(/\s+/g, "")
			.toLowerCase();
		router.push(`/event/${eventNameSlug}/${pageData.specific_event_id}`);
	}

	useEffect(() => {
		getPageDataForPurchasePage(specificEventIdFromParams).then((res) => {
			if (res) {
				setPageData(res);
			}
			setIsLoading(false);
		});
	}, []);

	return (
		<>
			{isLoading ? (
				<SplashPage />
			) : (
				<PurchaseTicket
					handleBack={handleBack}
					handlePurchaseTicket={handlePurchaseTicket}
					pageData={pageData}
					isPurchasing={isPurchasing}
				/>
			)}
		</>
	);
}

export default PurchaseTicketContainer;
