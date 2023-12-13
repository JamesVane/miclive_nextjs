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
import { putPerformerFollowEvent } from "@/api_functions/putPerformerFollowEvent";

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

	async function handleFollowButton() {
		/* setFollowingInProgress(true);
		try {
			const user = await Auth.currentAuthenticatedUser();
			const roleId = user.attributes["custom:RoleId"];
			const roleIdAsNumber =
				typeof roleId === "string" ? parseInt(roleId) : roleId;
			if (eventPageReducerState.data.base_event_id !== 0) {
				putPerformerFollowEvent({
					request_performer_role_id: roleIdAsNumber,
					request_new_following_id: eventPageReducerState.data.base_event_id,
				}).then(async (res) => {
					await Auth.updateUserAttributes(user, {
						"custom:PerformerFollowing": JSON.stringify(res),
					}).then(() => {
						startInit();
					});
					setFollowingInProgress(false);
				});
			} else {
				console.log("following failed");
				setFollowingInProgress(false);
			}
		} catch {
			console.log("following failed");
			setFollowingInProgress(false);
		} */
	}

	return (
		<>
			{dateOpen && specificIdfromParams ? (
				<PerformerEventDateModalV2
					specificIdfromParams={specificIdfromParams}
					isFromEventPage
					eventPageTicketPurchasedDate={ticketIsOpen ? true : false}
				/>
			) : null}
			{/* <NewEventPage
				followingInProgress={false}
				 handleFollowButton={handleFollowButton} 
				isAlreadyFollowing={eventPageData.alreadyFollowing}
				hasFromState={true}
				AuthEventPageData={dataForPage.data}
				authStatus={
					dataForPage.pageState === "performer auth"
						? "performer auth"
						: "not performer"
				}
			/> */}
		</>
	);
}

export default NewEventPageContainer;
