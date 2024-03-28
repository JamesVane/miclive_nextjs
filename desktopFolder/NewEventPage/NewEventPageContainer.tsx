/** @format */

import NewEventPage from "./NewEventPage";
import PerformerEventDateModalV2 from "@desk/performer_dj_promoter/performer/PerformerEventDateModalV2";
import { EventPageDataType } from "./NewEventPageReducer";

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
