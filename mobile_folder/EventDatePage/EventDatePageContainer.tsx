/** @format */
"use client";

import { useEffect, useState, useReducer } from "react";
import EventDatePage from "./EventDatePage";
import { useRouter, usePathname } from "next/navigation";
import { Auth } from "aws-amplify";
import {
	defaultDateModalState,
	reducer as dateReducer,
} from "./EventDateReducer";
import { getSingleDateInfoWithPerformerId } from "@/api_functions/getSingleDateInfoWithPerformerId";
import { getSingleDateForNotPerformer } from "@/api_functions/getSingleDateForNotPerformer";
import { putPerformerFollowEvent } from "@/api_functions/putPerformerFollowEvent";
import SplashPage from "@/SplashPage";

interface EventDatePageContainerProps {
	isFromTicketsPage?: boolean;
	isFromEventPage?: boolean;
	eventPageTicketPurchasedDate?: boolean;
	specificEventIdFromParams: string;
}

function EventDatePageContainer({
	isFromTicketsPage,
	isFromEventPage,
	eventPageTicketPurchasedDate,
	specificEventIdFromParams,
}: EventDatePageContainerProps) {
	const router = useRouter();
	const locationPathname = usePathname();

	const [followingInProgress, setFollowingInProgress] = useState(false);
	const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false);
	const [reducerState, dispatchReducerState] = useReducer(
		dateReducer,
		defaultDateModalState
	);

	const locationPathanmeEndingPathRemoved = locationPathname
		.split("/")
		.slice(0, -1)
		.join("/");

	function handleBackButton() {
		router.back();
	}

	async function initForTicketPage() {
		const currentUser = await Auth.currentAuthenticatedUser({
			bypassCache: true,
		});
		const requestPerformerRoleId = currentUser.attributes["custom:RoleId"];
		const followingArrayFromCog = currentUser.attributes[
			"custom:PerformerFollowing"
		]
			? JSON.parse(currentUser.attributes["custom:PerformerFollowing"])
			: [];

		getSingleDateInfoWithPerformerId(
			specificEventIdFromParams,
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
						specificEventIdFromParams,
						requestPerformerRoleId
					).then((response) => {
						if (response) {
							dispatchReducerState(response);
						}
					});
				} else {
					getSingleDateForNotPerformer(specificEventIdFromParams, true).then(
						(response) => {
							dispatchReducerState(response);
						}
					);
				}
			} else if (roleType === "dj" || roleType === "promoter") {
				getSingleDateForNotPerformer(specificEventIdFromParams, false).then(
					(response) => {
						dispatchReducerState(response);
					}
				);
			}
		} catch {
			getSingleDateForNotPerformer(specificEventIdFromParams, false).then(
				(response) => {
					dispatchReducerState(response);
				}
			);
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
				<SplashPage />
			) : (
				<EventDatePage
					followingInProgress={followingInProgress}
					handleFollowButton={handleFollowButton}
					refreshPage={initSplitter}
					isAlreadyFollowing={isAlreadyFollowing}
					isFromTicketsPage={isFromTicketsPage ? true : false}
					stateFromReducer={reducerState}
					handleBackButton={handleBackButton}
					hasTicketButton={
						reducerState.pageState === "log in upcoming with no ticket" ||
						reducerState.pageState === "not log in upcoming"
					}
				/>
			)}
		</>
	);
}

export default EventDatePageContainer;
