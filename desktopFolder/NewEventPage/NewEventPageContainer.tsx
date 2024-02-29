/** @format */

import { useEffect, useReducer, useState } from "react";
import NewEventPage from "./NewEventPage";
import PerformerEventDateModalV2 from "@desk/performer_dj_promoter/performer/PerformerEventDateModalV2";
import { useRouter } from "next/navigation";
import { getEventPageDataForAuthPerformer } from "@/api_functions/getEventPageDataForAuthPerformer";
import { getEventPageDataForUnauthenticatedUser } from "@/api_functions/getEventPageDataForUnauthenticatedUser";
import { Auth } from "aws-amplify";
import {
	defaultEventPageData,
	eventPageReducer,
	EventPageDataType,
} from "./NewEventPageReducer";
import SplashPage from "@/SplashPage";

interface NewEventPageContainerProps {
	dateOpen?: boolean;
	ticketIsOpen?: boolean;
	eventPageData: EventPageDataType;
	specificIdfromParams?: string;
}

function NewEventPageContainer({
	dateOpen,
	ticketIsOpen,
	eventPageData,
	specificIdfromParams,
}: NewEventPageContainerProps) {
	const dataForPage = eventPageData.pageState;

	/* const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false);
	const [followingInProgress, setFollowingInProgress] = useState(false); */
	const isLoading = dataForPage.pageState === "loading";

	return (
		<>
			{dateOpen && specificIdfromParams ? (
				<PerformerEventDateModalV2
					specificIdfromParams={specificIdfromParams}
					isFromEventPage
					eventPageTicketPurchasedDate={ticketIsOpen ? true : false}
					eventName={eventPageData.pageState.data.event_name
						.trim()
						.replace(/\s+/g, "")
						.toLowerCase()}
				/>
			) : null}
			<NewEventPage
				followingInProgress={false}
				/* handleFollowButton={handleFollowButton} */
				isAlreadyFollowing={eventPageData.alreadyFollowing}
				hasFromState={true}
				AuthEventPageData={dataForPage.data}
				authStatus={
					dataForPage.pageState === "performer auth"
						? "performer auth"
						: "not performer"
				}
			/>
		</>
	);
}

export default NewEventPageContainer;
