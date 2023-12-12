/** @format */
"use client";

import React from "react";
import SignInPage from "./SignInPage";
import { Auth } from "aws-amplify";
import {
	setSignInPasswordSlice,
	setSignInPhoneSlice,
} from "../../../store/signInStateSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootStore";
import {
	formatPhoneNumber,
	unformatPhoneNumber,
} from "../../../generic_functions/formatPhoneNumber";
import { useRouter } from "next/navigation";
import { setCurrentSub } from "../../../store/currentSubStore";
import { setForgotPasswordDefault } from "../../../store/forgotPasswordSlice";
import { postCreateAccountRoleInfo } from "../../../api_functions/postCreateAccountRoleInfo";
import { setAccountType } from "../../../store/DjInviteState";

interface SignInPageContainerProps {
	isForPurchase?: boolean;
	isFromDjInvite?: string;
	isForPerformerQr?: string;
	isForKeyCheckIn?: string;
	eventNameFromParams?: string;
	keyFromParams?: string;
}

function SignInPageContainer({
	isForPurchase,
	isFromDjInvite,
	isForPerformerQr,
	isForKeyCheckIn,
	eventNameFromParams,
	keyFromParams,
}: SignInPageContainerProps) {
	const router = useRouter();
	const dispatch = useDispatch();

	const [signInError, setSignInError] = React.useState("");
	const [isSubmitting, setIsSubmitting] = React.useState(false);

	const { phone, password } = useSelector(
		(state: RootState) => state.signInState
	);

	const submitDisabled = password === "" || phone === "";

	function removeWhitespace(str: string) {
		const adjusted = str.replace(/\s+/g, "");
		return adjusted;
	}

	function handleSetPhone(phone: string) {
		const adjustedValue = formatPhoneNumber(phone);
		if (adjustedValue !== null) {
			dispatch(setSignInPhoneSlice(adjustedValue));
			setSignInError("");
		}
	}

	function handleSetPassword(password: string) {
		dispatch(setSignInPasswordSlice(removeWhitespace(password)));
		setSignInError("");
	}

	function clearPhone() {
		dispatch(setSignInPhoneSlice(""));
		setSignInError("");
	}

	function clearPassword() {
		dispatch(setSignInPasswordSlice(""));
		setSignInError("");
	}

	function navigateToPurchase() {
		setIsSubmitting(false);
		setSignInError("");
		router.push(`/m/buy_ticket/purchase/${keyFromParams}`);
	}

	async function handleCreateRole(
		userType: "performer" | "promoter" | "dj",
		user: any
	) {
		const userSub = user.attributes.sub;
		postCreateAccountRoleInfo({
			has_no_image: true,
			request_tagline: "",
			request_sub: userSub,
			request_user_type: userType!,
			request_city: null,
			request_phone: null,
			request_email: null,
			request_ig: null,
			request_website: null,
			request_performer_role_key: null,
		}).then(async (res) => {
			await Auth.updateUserAttributes(user, {
				"custom:RoleId": res.new_id.toString(),
			});
		});
	}

	function navigateToDjAccept() {
		dispatch(setAccountType("dj"));
		handleExit();
	}

	function navigateToPerformerQrOrKey() {
		dispatch(setAccountType("performer"));
		handleExit();
	}

	async function handleSignInSplitterSection(
		accountType: "performer" | "dj",
		user: any,
		navigateToFunction: () => void
	) {
		const userSub = user.attributes.sub;
		const roleType = user.attributes["custom:RoleType"];
		if (roleType !== accountType) {
			await Auth.signOut().then(() => {
				setIsSubmitting(false);
				setSignInError(`Must sign in with ${accountType} account`);
			});
		} else {
			if (user.attributes["custom:RoleId"]) {
				dispatch(setCurrentSub(userSub));
				navigateToFunction();
			} else {
				handleCreateRole(accountType, user).then(() => {
					dispatch(setCurrentSub(userSub));
					navigateToFunction();
				});
			}
		}
	}

	const handleSignIn = async () => {
		setIsSubmitting(true);
		try {
			const user = await Auth.signIn(
				`+1${unformatPhoneNumber(phone)}`,
				password
			);
			const userSub = user.attributes.sub;
			const roleType = user.attributes["custom:RoleType"];
			if (isFromDjInvite) {
				handleSignInSplitterSection("dj", user, navigateToDjAccept);
			} else if (isForKeyCheckIn) {
				handleSignInSplitterSection(
					"performer",
					user,
					navigateToPerformerQrOrKey
				);
			} else if (isForPerformerQr) {
				handleSignInSplitterSection(
					"performer",
					user,
					navigateToPerformerQrOrKey
				);
			} else if (isForPurchase) {
				handleSignInSplitterSection("performer", user, navigateToPurchase);
			} else {
				if (user.attributes["custom:RoleId"]) {
					dispatch(setCurrentSub(userSub));
					router.push(`/m/${roleType}`);
					setIsSubmitting(false);
					setSignInError("");
				} else {
					dispatch(setCurrentSub(userSub));
					router.push(`/m/add_info/${roleType}`);
					setIsSubmitting(false);
					setSignInError("");
				}
			}
		} catch (err: any) {
			setIsSubmitting(false);
			setSignInError(err.message);
		}
	};

	function handleForgotPassword() {
		dispatch(setForgotPasswordDefault());
		router.push("/m/forgot_password");
	}

	function handleExit() {
		if (isForPurchase) {
			router.push(`/m/event/${eventNameFromParams}/${keyFromParams}`);
		} else if (isForPerformerQr) {
			router.push(isForPerformerQr);
		} else if (isForKeyCheckIn) {
			router.push(isForKeyCheckIn);
		} else if (isFromDjInvite) {
			router.push(isFromDjInvite);
		} else {
			router.push("/m");
		}
	}

	return (
		<SignInPage
			handleSignIn={handleSignIn}
			handleSetPhone={handleSetPhone}
			handleSetPassword={handleSetPassword}
			isSubmitting={isSubmitting}
			phone={phone}
			password={password}
			clearPassword={clearPassword}
			clearPhone={clearPhone}
			signInError={signInError}
			submitDisabled={submitDisabled}
			handleForgotPassword={handleForgotPassword}
			handleExit={handleExit}
		/>
	);
}

export default SignInPageContainer;
