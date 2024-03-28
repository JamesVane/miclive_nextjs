/** @format */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCheckIfQrIsValid } from "@/api_functions/getCheckIfQrIsValid";
import SplashPage from "@/SplashPage";
import InvalidQr from "./InvalidQr";
import { Auth } from "aws-amplify";
import QrSignUpLogInCheckIn from "./QrSignUpLogInCheckIn";
import NotPerformerCheckIn from "./NotPerformerCheckIn";
import SignInPage from "@mobi/StartPage/SignInPage";
import SignedInQrCheckin from "./SignedInQrCheckin";

export type QrData = {
	name: string;
	tagline: string;
	specificEventId: number;
	baseEventId: number;
	startTime: string;
	endTime: string;
	songs_per_performer: number;
	time_per_performer: number;
	location: string;
};

interface PerformerQrLandingProps {
	isSignIn?: boolean;
	uuidFromParams: string;
}

function PerformerQrLanding({
	isSignIn,
	uuidFromParams,
}: PerformerQrLandingProps) {
	const router = useRouter();

	const [isValidUuid, setIsValidUuid] = useState(false);
	const [accountType, setAccountType] = useState<
		"performer" | "promoter" | "dj" | null
	>(null);

	const [isLoading, setIsLoading] = useState(true);
	const [eventData, setEventData] = useState<QrData | null>(null);

	const returnUrl = `/checkinqr/${uuidFromParams}`;

	useEffect(() => {
		getCheckIfQrIsValid(uuidFromParams).then(async (res) => {
			if (res.message === "valid uuid") {
				setIsValidUuid(true);
				setEventData(res.data);
				try {
					const user = await Auth.currentAuthenticatedUser();
					const roleType = user.attributes["custom:RoleType"];
					setAccountType(roleType);
					setIsLoading(false);
				} catch {
					setIsLoading(false);
				}
			} else {
				setIsValidUuid(false);
				setIsLoading(false);
			}
		});
	}, []);

	function navigateToSignIn() {
		router.push(`/checkinqr/${uuidFromParams}/sign_in`);
	}

	function navigateToCreateAccount() {
		router.push(`/checkinqr/${uuidFromParams}/create_account`);
	}

	return (
		<>
			{isLoading ? (
				<SplashPage />
			) : (
				<>
					{isValidUuid ? (
						<>
							{isSignIn ? (
								<SignInPage isForPerformerQr={returnUrl} />
							) : accountType === "performer" ? (
								<SignedInQrCheckin
									uuid={uuidFromParams}
									eventData={eventData!}
								/>
							) : accountType ? (
								<NotPerformerCheckIn accountType={accountType} />
							) : (
								<QrSignUpLogInCheckIn
									navigateToSignIn={navigateToSignIn}
									navigateToCreateAccount={navigateToCreateAccount}
									baseEventId={eventData!.baseEventId}
									eventName={eventData!.name}
									eventTagline={eventData!.tagline}
								/>
							)}
						</>
					) : (
						<InvalidQr />
					)}
				</>
			)}
		</>
	);
}

export default PerformerQrLanding;
