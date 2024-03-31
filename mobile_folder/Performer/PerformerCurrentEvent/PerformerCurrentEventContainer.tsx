/** @format */
"use client";

import { useEffect, useState } from "react";
import PerformerCurrentEvent from "./PerformerCurrentEvent";
import { checkIfCheckedIn } from "@/api_functions/getCheckIfCheckedIn";
import { Auth } from "aws-amplify";
import SplashPage from "@/SplashPage";
import CheckInPage from "./CheckInPage";
import { getPerformerCurrentEventState } from "@/api_functions/getPerformerCurrentEventState";
import { useDispatch } from "react-redux";
import ExitModal from "./ExitModal";

interface PerformerCurrentEventContainerProps {
	specificEventIdFromParams: string;
	eventNameFromParams: string;
}

function PerformerCurrentEventContainer({
	specificEventIdFromParams,
	eventNameFromParams,
}: PerformerCurrentEventContainerProps) {
	const dispatch = useDispatch();

	const [checkedIn, setCheckedIn] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [myRoleId, setMyRoleId] = useState(0);
	const [exitModalOpen, setExitModalOpen] = useState(false);
	/* const selectedBaseEvent = upcomingEventsArray[0]
		? upcomingEventsArray[0]
		: { name: "", base_event_id: 0 }; */

	useEffect(() => {
		async function checkIfChecked() {
			setIsLoading(true);
			const user = await Auth.currentAuthenticatedUser();
			const authToken = user.signInUserSession.idToken.jwtToken;
			const roleId = user.attributes["custom:RoleId"];
			const numberRoleId =
				typeof roleId === "string" ? parseInt(roleId) : roleId;
			if (myRoleId === 0) {
				setMyRoleId(numberRoleId);
			}

			checkIfCheckedIn(authToken, Number(specificEventIdFromParams)).then(
				(res) => {
					setCheckedIn(res);
					setIsLoading(false);
					if (!res) {
						setIsLoading(false);
					}
				}
			);
		}

		checkIfChecked();
	}, []);

	function handleCheckedInFromCheckInPage() {
		setIsLoading(true);
		setCheckedIn(true);
	}

	return (
		<>
			{exitModalOpen ? (
				<ExitModal cancelExit={() => setExitModalOpen(false)} />
			) : null}
			{isLoading ? (
				<SplashPage />
			) : (
				<>
					{checkedIn ? (
						<PerformerCurrentEvent
							specificEventIdFromParams={Number(specificEventIdFromParams)}
							myRoleId={myRoleId}
							handleExitModal={() => setExitModalOpen(true)}
						/>
					) : (
						<CheckInPage
							setCheckedIn={handleCheckedInFromCheckInPage}
							specificEventId={Number(specificEventIdFromParams)}
						/>
					)}
				</>
			)}
		</>
	);
}

export default PerformerCurrentEventContainer;
