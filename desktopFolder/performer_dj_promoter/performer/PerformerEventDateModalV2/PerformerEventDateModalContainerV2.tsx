/** @format */

import { useEffect, useState, useReducer } from "react";
import PerformerEventDateModalV2 from "./PerformerEventDateModalV2";
import { Auth } from "aws-amplify";
import { getSingleDateInfoWithPerformerId } from "@/api_functions/getSingleDateInfoWithPerformerId";
import EventDateModalSplash from "./EventDateModalSplash";
import {
	defaultDateModalState,
	reducer as dateReducer,
} from "./dateModalReducer";
import { getSingleDateForNotPerformer } from "@/api_functions/getSingleDateForNotPerformer";
import { putPerformerFollowEvent } from "@/api_functions/putPerformerFollowEvent";
import { useRouter } from "next/navigation";

interface PerformerEventDateModalContainerV2Props {
	isFromTicketsPage?: boolean;
	isFromEventPage?: boolean;
	eventPageTicketPurchasedDate?: boolean;
	specificIdfromParams: string;
	eventName?: string;
}

function PerformerEventDateModalContainerV2({
	eventPageTicketPurchasedDate,
	isFromTicketsPage,
	isFromEventPage,
	specificIdfromParams,
	eventName,
}: PerformerEventDateModalContainerV2Props) {
	const router = useRouter();

	const [followingInProgress, setFollowingInProgress] = useState(false);
	const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false);
	const [reducerState, dispatchReducerState] = useReducer(
		dateReducer,
		defaultDateModalState
	);

	function handleClose() {
		if (isFromTicketsPage) {
			router.push("/performer/my_events");
		} else {
			router.push(`/event/${eventName}`);
		}
	}

	async function initForTicketPage() {
		const currentUser = await Auth.currentAuthenticatedUser({
			bypassCache: true,
		});
		const requestPerformerRoleId = currentUser.attributes["custom:RoleId"];
		const followingArrayFromCog = JSON.parse(
			currentUser.attributes["custom:PerformerFollowing"]
		);

		getSingleDateInfoWithPerformerId(
			specificIdfromParams!,
			requestPerformerRoleId
		).then((response) => {
			if (response) {
				dispatchReducerState(response);
				setIsAlreadyFollowing(
					followingArrayFromCog.includes(
						typeof response.data.base_event_id === "number"
							? response.data.base_event_id
							: Number(response.data.base_event_id)
					)
				);
			}
		});
	}

	async function initForEventPage() {
		try {
			const currentUser = await Auth.currentAuthenticatedUser();
			const roleType = currentUser.attributes["custom:RoleType"];
			if (roleType === "performer") {
				const requestPerformerRoleId = currentUser.attributes["custom:RoleId"];
				if (eventPageTicketPurchasedDate) {
					getSingleDateInfoWithPerformerId(
						specificIdfromParams!,
						requestPerformerRoleId
					).then((response) => {
						if (response) {
							dispatchReducerState(response);
						}
					});
				} else {
					if (specificIdfromParams) {
						getSingleDateForNotPerformer(specificIdfromParams, true).then(
							(response) => {
								dispatchReducerState(response);
							}
						);
					}
				}
			} else if (roleType === "dj" || roleType === "promoter") {
				if (specificIdfromParams) {
					getSingleDateForNotPerformer(specificIdfromParams, false).then(
						(response) => {
							dispatchReducerState(response);
						}
					);
				}
			}
		} catch {
			if (specificIdfromParams) {
				getSingleDateForNotPerformer(specificIdfromParams, false).then(
					(response) => {
						dispatchReducerState(response);
					}
				);
			}
		}
	}

	function initSplitter() {
		if (isFromTicketsPage) {
			initForTicketPage();
		} else if (isFromEventPage) {
			initForEventPage();
		}
	}

	useEffect(() => {
		initSplitter();
	}, []);

	async function handleFollowButton() {
		setFollowingInProgress(true);
		try {
			const user = await Auth.currentAuthenticatedUser();
			const roleId = user.attributes["custom:RoleId"];
			const roleIdAsNumber =
				typeof roleId === "string" ? parseInt(roleId) : roleId;
			if (reducerState.base_event_id !== 0) {
				putPerformerFollowEvent({
					request_performer_role_id: roleIdAsNumber,
					request_new_following_id: reducerState.base_event_id,
				}).then(async (res) => {
					await Auth.updateUserAttributes(user, {
						"custom:PerformerFollowing": JSON.stringify(res),
					}).then(() => {
						initForTicketPage();
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
		}
	}

	return (
		<>
			{reducerState.pageState === "loading" ? (
				<EventDateModalSplash handleClose={handleClose} />
			) : (
				<PerformerEventDateModalV2
					followingInProgress={followingInProgress}
					handleFollowButton={handleFollowButton}
					stateFromReducer={reducerState}
					handleClose={handleClose}
					isFromTicketsPage={isFromTicketsPage}
					hasTicketButton={
						reducerState.pageState === "log in upcoming with no ticket" ||
						reducerState.pageState === "not log in upcoming"
					}
					refreshPage={initSplitter}
					isAlreadyFollowing={isAlreadyFollowing}
				/>
			)}
		</>
	);
}

export default PerformerEventDateModalContainerV2;

// ADD HIGHLIGHT WHEN HOVER OVER EVENT PIC
