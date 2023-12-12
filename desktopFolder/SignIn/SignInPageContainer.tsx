/** @format */
"use client";

import React from "react";
import SignInPage from "./SignInPage";
import { Auth } from "aws-amplify";
import {
	setSignInPasswordSlice,
	setSignInPhoneSlice,
} from "../../store/signInStateSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootStore";
import {
	formatPhoneNumber,
	unformatPhoneNumber,
} from "../../generic_functions/formatPhoneNumber";
import { setCurrentSub } from "../../store/currentSubStore";
import { setForgotPasswordDefault } from "../../store/forgotPasswordSlice";
import { postCreateAccountRoleInfo } from "../../api_functions/postCreateAccountRoleInfo";
import { setAccountType } from "../../store/DjInviteState";
import { useRouter } from "next/navigation";

interface SignInPageContainerProps {
	isForPurchase?: boolean;
	isFromDjInvite?: string;
	keyFromParams?: string;
	eventNameFromParams?: string;
}

function SignInPageContainer({
	isForPurchase,
	isFromDjInvite,
	keyFromParams,
	eventNameFromParams,
}: SignInPageContainerProps) {
	const dispatch = useDispatch();
	const router = useRouter();

	const fromUrl = localStorage.getItem("fromUrl");

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
		router.push(`/buy_ticket/purchase/${keyFromParams}`);
	}

	function navigateToDjAccept() {
		dispatch(setAccountType("dj"));
		handleExit();
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
				if (roleType !== "dj") {
					await Auth.signOut().then(() => {
						setIsSubmitting(false);
						setSignInError("Must sign in with DJ account");
					});
				} else {
					if (user.attributes["custom:RoleId"]) {
						dispatch(setCurrentSub(userSub));
						navigateToDjAccept();
					} else {
						handleCreateRole("dj", user).then(() => {
							dispatch(setCurrentSub(userSub));
							navigateToDjAccept();
						});
					}
				}
			} else if (isForPurchase) {
				if (roleType !== "performer") {
					await Auth.signOut().then(() => {
						setIsSubmitting(false);
						setSignInError("Must sign in with Performer account");
					});
				} else {
					if (user.attributes["custom:RoleId"]) {
						dispatch(setCurrentSub(userSub));
						navigateToPurchase();
					} else {
						handleCreateRole("performer", user).then(() => {
							dispatch(setCurrentSub(userSub));
							navigateToPurchase();
						});
					}
				}
			} else {
				if (user.attributes["custom:RoleId"]) {
					dispatch(setCurrentSub(userSub));
					if (fromUrl) {
						await new Promise(() => router.push(fromUrl));
						localStorage.removeItem("fromUrl");
					} else {
						router.push(`/${roleType}`);
					}
					setIsSubmitting(false);
					setSignInError("");
				} else {
					dispatch(setCurrentSub(userSub));
					router.push(`/add_info/${roleType}`);
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
		router.push("/forgot_password");
	}

	async function handleExit() {
		if (isForPurchase) {
			router.push(`/event/${eventNameFromParams}?${keyFromParams}`);
		} else if (fromUrl) {
			await new Promise(() => router.push(fromUrl));
			localStorage.removeItem("fromUrl");
		} else {
			router.push(isFromDjInvite ? isFromDjInvite : "/");
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
