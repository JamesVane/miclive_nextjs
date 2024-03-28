/** @format */
"use client";

import { useState, useEffect } from "react";
import WalkInEventKey from "./WalkInEventKey";
import { Auth } from "aws-amplify";
import { getCheckIfCheckInKeyIsvalid } from "@/api_functions/getCheckIfCheckInKeyIsvalid";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import {
	setAccountType,
	setEventData,
	KeyEventData,
} from "@/store/walkinKeyCheckInStateSlice";
import NotPerformerCheckIn from "@mobi/Performer/PerformerQrLanding/NotPerformerCheckIn";
import SignedInAsPerformerKeyCheckin from "./SignedInAsPerformerKeyCheckin";
import KeySignUpLogIn from "./KeySignUpLogIn";
import SignInPage from "@mobi/StartPage/SignInPage";

interface WalkInEventKeyContainerProps {
	hasGoodKey?: boolean;
	isSignIn?: boolean;
	ketFromParams?: string;
}

function WalkInEventKeyContainer({
	hasGoodKey,
	isSignIn,
	ketFromParams,
}: WalkInEventKeyContainerProps) {
	const router = useRouter();
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(false);
	const { accountType, eventData } = useSelector(
		(state: RootState) => state.walkinKeyCheckInStateSlice
	);
	function handleSetAccountType(arg: "performer" | "promoter" | "dj" | null) {
		dispatch(setAccountType(arg));
	}

	function handleSetEventData(arg: KeyEventData | null) {
		dispatch(setEventData(arg));
	}

	const [wrongCodeDisplay, setWrongCodeDisplay] = useState(false);

	function handleComplete(input: any) {
		if (!isLoading) {
			setIsLoading(true);
			getCheckIfCheckInKeyIsvalid(input).then(async (res) => {
				if (res.message === "valid key") {
					handleSetEventData(res.data);
					try {
						const user = await Auth.currentAuthenticatedUser();
						const roleType = user.attributes["custom:RoleType"];
						handleSetAccountType(roleType);
						setIsLoading(false);
						router.push(`/walkin_key/${input}`);
					} catch {
						setIsLoading(false);
						router.push(`/walkin_key/${input}`);
					}
				} else {
					setWrongCodeDisplay(true);
					setIsLoading(false);
				}
			});
		}
	}

	useEffect(() => {
		async function checkIfAuth() {
			setIsLoading(true);
			try {
				const user = await Auth.currentAuthenticatedUser();
				const roleType = user.attributes["custom:RoleType"];
				handleSetAccountType(roleType);
				setIsLoading(false);
			} catch {
				handleSetAccountType(null);
				setIsLoading(false);
			}
		}
		checkIfAuth();
	}, []);

	function navigateToSignIn() {
		router.push(`/walkin_key/${ketFromParams}/sign_in`);
	}
	function navigateToCreateAccount() {
		router.push(`/walkin_key/${ketFromParams}/create_account`);
	}

	return (
		<>
			{hasGoodKey ? (
				<>
					{isSignIn ? (
						<SignInPage isForKeyCheckIn={`/walkin_key/${ketFromParams}`} />
					) : accountType === "performer" ? (
						<SignedInAsPerformerKeyCheckin checkinKey={`${ketFromParams}`} />
					) : accountType ? (
						<NotPerformerCheckIn accountType={accountType} />
					) : (
						<KeySignUpLogIn
							navigateToSignIn={navigateToSignIn}
							navigateToCreateAccount={navigateToCreateAccount}
							baseEventId={eventData!.baseEventId}
							eventName={eventData!.name}
							eventTagline={eventData!.tagline}
						/>
					)}
				</>
			) : (
				<WalkInEventKey
					isLoading={isLoading}
					handleComplete={handleComplete}
					setWrongCodeDisplay={setWrongCodeDisplay}
					wrongCodeDisplay={wrongCodeDisplay}
				/>
			)}
		</>
	);
}

export default WalkInEventKeyContainer;
