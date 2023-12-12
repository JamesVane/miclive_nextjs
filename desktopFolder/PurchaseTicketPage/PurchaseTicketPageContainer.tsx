/** @format */

import { useEffect, useState } from "react";
import PurchaseTicketPage from "./PurchaseTicketPage";
import { Auth } from "aws-amplify";
import { addPerformerToRoster } from "@/api_functions/postAddPerformerToRoster";
import { useRouter } from "next/navigation";
import {
	getPageDataForPurchasePage,
	PurchasePageData,
} from "@/api_functions/getPageDataForPurchasePage";
import SplashPage from "@/SplashPage";

interface PurchaseTicketPageContainerProps {
	specificEventIdFromParams: string;
}

function PurchaseTicketPageContainer({
	specificEventIdFromParams,
}: PurchaseTicketPageContainerProps) {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [isPurchasing, setIsPurchasing] = useState(false);
	const [pageData, setPageData] = useState<PurchasePageData>(
		{} as PurchasePageData
	);

	async function addToRoster() {
		const user = await Auth.currentAuthenticatedUser();
		const roleId = user.attributes["custom:RoleId"];
		addPerformerToRoster({
			request_performer_id: Number(roleId),
			request_specific_event_id: Number(specificEventIdFromParams),
		});
	}

	function handlePurchaseTicket() {
		setIsPurchasing(true);
		addToRoster().then(() => {
			router.push(
				`/event/${pageData.name}/${pageData.specific_event_id}/ticket`
			);
			setIsPurchasing(false);
		});
	}

	function handleBack() {
		router.push(`/event/${pageData.name}/${pageData.specific_event_id}`);
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
				<PurchaseTicketPage
					handleBack={handleBack}
					handlePurchaseTicket={handlePurchaseTicket}
					pageData={pageData}
					isPurchasing={isPurchasing}
				/>
			)}
		</>
	);
}

export default PurchaseTicketPageContainer;
