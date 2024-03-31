/** @format */
"use client";

import { useEffect } from "react";
import DjAcceptInviteLanding from "./DjAcceptInviteLanding";
import { getDjCheckDateKey } from "@/api_functions_no_auth/getDjCheckEvenOrDatetKey";
import WrongAccountType from "./WrongAccountType";
import { useSelector, useDispatch } from "react-redux";
import {
	setUuid,
	setBadUrl,
	setDateObject,
	setAccountType,
} from "@/store/DjInviteState";
import { RootState } from "@/app/LocalizationProviderHelper";
import BadInviteUrl from "./BadInviteUrl";
import SplashPage from "@/SplashPage";
import { Auth } from "aws-amplify";
import SignInPage from "@desk/SignIn";
import DjAcceptDatePage from "./DjAcceptDatePage";
import { useRouter } from "next/navigation";

interface DjAcceptInviteContainerProps {
	isSigningIn?: boolean;
	inviteUuid: string;
}

function DjAcceptInviteContainer({
	isSigningIn,
	inviteUuid,
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

	const returnToUrl = `/dj_accept_date/${inviteUuid}`;

	function navigateToSignIn() {
		router.push(`${returnToUrl}/sign_in`);
	}

	function navigateToCreateAccount() {
		router.push(`/dj_accept_date/${inviteUuid}/create_account`);
	}

	useEffect(() => {
		if (!isSigningIn) {
			getDjCheckDateKey(inviteUuid!).then((res) => {
				console.log("res:", res);
				if (res.Value) {
					dispatch(setUuid(inviteUuid!));
					dispatch(setDateObject(res.Value));
					checkAuthAndType();
				} else {
					setBadUrlTrue();
				}
			});
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
						<DjAcceptDatePage />
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
