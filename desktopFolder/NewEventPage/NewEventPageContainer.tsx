/** @format */
"use client";

import { useEffect, useReducer, useState } from "react";
import NewEventPage from "./NewEventPage";
import PerformerEventDateModalV2 from "@desk/performer_dj_promoter/performer/PerformerEventDateModalV2";
import { useRouter } from "next/navigation";
import { getEventPageDataForAuthPerformer } from "@/api_functions/getEventPageDataForAuthPerformer";
import { getEventPageDataForUnauthenticatedUser } from "@/api_functions/getEventPageDataForUnauthenticatedUser";
import { Auth } from "aws-amplify";
import { defaultEventPageData, eventPageReducer } from "./NewEventPageReducer";
import SplashPage from "@/SplashPage";
import { putPerformerFollowEvent } from "@/api_functions/putPerformerFollowEvent";

interface NewEventPageContainerProps {
	dateOpen?: boolean;
	ticketIsOpen?: boolean;
	eventNameFromParams: string;
	specificIdfromParams?: string;
}

function NewEventPageContainer({
	dateOpen,
	ticketIsOpen,
	eventNameFromParams,
	specificIdfromParams,
}: NewEventPageContainerProps) {
	const router = useRouter();

	const fromUrl = localStorage.getItem("fromUrl");

	const [eventPageReducerState, dispatchEventPageReducerState] = useReducer(
		eventPageReducer,
		defaultEventPageData
	);
	const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false);
	const [followingInProgress, setFollowingInProgress] = useState(false);
	const isLoading = eventPageReducerState.pageState === "loading";

	async function handleBack() {
		if (fromUrl) {
			await new Promise(() => router.push(fromUrl));
			localStorage.removeItem("fromUrl");
		} else {
			router.push("/performer");
		}
	}

	async function startInit() {
		try {
			const currentUser = await Auth.currentAuthenticatedUser({
				bypassCache: true,
			});
			const roleType = currentUser.attributes["custom:RoleType"];
			const requestPerformerRoleId = currentUser.attributes["custom:RoleId"];
			const followingArrayFromCog = JSON.parse(
				currentUser.attributes["custom:PerformerFollowing"]
			);
			if (roleType === "performer" && eventNameFromParams) {
				getEventPageDataForAuthPerformer(
					eventNameFromParams,
					requestPerformerRoleId
				).then((data) => {
					if (data.data.base_event_id) {
						setIsAlreadyFollowing(
							followingArrayFromCog.includes(
								typeof data.data.base_event_id === "number"
									? data.data.base_event_id
									: Number(data.data.base_event_id)
							)
						);
					}
					dispatchEventPageReducerState(data);
				});
			} else {
				getEventPageDataForUnauthenticatedUser(eventNameFromParams).then(
					(data) => {
						dispatchEventPageReducerState(data);
					}
				);
			}
		} catch {
			getEventPageDataForUnauthenticatedUser(eventNameFromParams).then(
				(data) => {
					dispatchEventPageReducerState(data);
				}
			);
		}
	}

	useEffect(() => {
		startInit();
	}, []);

	async function handleFollowButton() {
		setFollowingInProgress(true);
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
		}
	}

	return (
		<>
			{isLoading ? (
				<SplashPage />
			) : (
				<>
					{dateOpen ? (
						<PerformerEventDateModalV2
							isFromEventPage
							eventPageTicketPurchasedDate={ticketIsOpen ? true : false}
						/>
					) : null}
					<NewEventPage
						followingInProgress={followingInProgress}
						handleFollowButton={handleFollowButton}
						isAlreadyFollowing={isAlreadyFollowing}
						hasFromState={fromUrl ? true : false}
						handleBack={handleBack}
						AuthEventPageData={eventPageReducerState.data}
						authStatus={
							eventPageReducerState.pageState === "performer auth"
								? "performer auth"
								: "not performer"
						}
					/>
				</>
			)}
		</>
	);
}

export default NewEventPageContainer;
