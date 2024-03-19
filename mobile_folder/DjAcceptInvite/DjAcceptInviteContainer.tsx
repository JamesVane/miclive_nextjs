/** @format */
"use client";

import { useEffect } from "react";
import DjAcceptInviteLanding from "./DjAcceptInviteLanding";
import { useRouter } from "next/navigation";
import {
	getDjCheckEventKey,
	getDjCheckDateKey,
} from "../../api_functions/getDjCheckEvenOrDatetKey";
import WrongAccountType from "./WrongAccountType";
import { useSelector, useDispatch } from "react-redux";
import {
	setUuid,
	setBadUrl,
	setDateObject,
	setEventObject,
	setAccountType,
} from "../../store/DjInviteState";
import { RootState } from "@/app/LocalizationProviderHelper";
import BadInviteUrl from "./BadInviteUrl";
import SplashPage from "../../SplashPage";
import { Auth } from "aws-amplify";
import SignInPage from "../StartPage/SignInPage";
import DjAcceptDatePage from "./DjAcceptDatePage";
import DjAcceptEventPage from "./DjAcceptEventPage";

interface DjAcceptInviteContainerProps {
	house?: boolean;
	isSigningIn?: boolean;
	inviteUuidFromParams: string;
}

function DjAcceptInviteContainer({
	house,
	isSigningIn,
	inviteUuidFromParams,
}: DjAcceptInviteContainerProps) {
	const dispatch = useDispatch();
	const router = useRouter();

	const { uuid, badUrl, accountType } = useSelector(
		(state: RootState) => state.djInviteState
	);

	const isLoading = uuid === "";

	function setBadUrlTrue() {
		dispatch(setBadUrl(true));
	}

	async function checkAuthAndType(): Promise<
		"performer" | "promoter" | "dj" | "none"
	> {
		try {
			const currentUser = await Auth.currentAuthenticatedUser();
			const roleType = currentUser.attributes["custom:RoleType"];

			dispatch(setAccountType(roleType));
			return roleType;
		} catch {
			return "none";
		}
	}

	const returnToUrl = house
		? `/m/dj_accept_event/${inviteUuidFromParams}`
		: `/m/dj_accept_date/${inviteUuidFromParams}`;

	function navigateToSignIn() {
		router.push(`${returnToUrl}/sign_in`);
	}

	function navigateToCreateAccount() {
		if (house) {
			router.push(`/m/dj_accept_event/${inviteUuidFromParams}/create_account`);
		} else {
			router.push(`/m/dj_accept_date/${inviteUuidFromParams}/create_account`);
		}
	}

	useEffect(() => {
		if (!isSigningIn) {
			if (house) {
				getDjCheckEventKey(inviteUuidFromParams).then((res) => {
					if (res.Value) {
						dispatch(setUuid(inviteUuidFromParams));
						dispatch(setEventObject(res.Value));
						checkAuthAndType();
					} else {
						setBadUrlTrue();
					}
				});
			} else {
				getDjCheckDateKey(inviteUuidFromParams).then((res) => {
					if (res.Value) {
						dispatch(setUuid(inviteUuidFromParams));
						dispatch(setDateObject(res.Value));
						checkAuthAndType();
					} else {
						setBadUrlTrue();
					}
				});
			}
		}
	}, []);

	return (
		<>
			{isSigningIn ? (
				<SignInPage isFromDjInvite={returnToUrl} />
			) : (
				<>
					{badUrl ? (
						<BadInviteUrl />
					) : accountType === "performer" || accountType === "promoter" ? (
						<WrongAccountType
							accountType={accountType as "performer" | "promoter"}
						/>
					) : isLoading ? (
						<SplashPage />
					) : accountType === "dj" ? (
						<>{house ? <DjAcceptEventPage /> : <DjAcceptDatePage />}</>
					) : (
						<DjAcceptInviteLanding
							navigateToCreateAccount={navigateToCreateAccount}
							navigateToSignIn={navigateToSignIn}
						/>
					)}
				</>
			)}
		</>
	);
}

export default DjAcceptInviteContainer;
