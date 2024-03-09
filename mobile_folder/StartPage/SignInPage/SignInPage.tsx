/** @format */

import React, { useState } from "react";
import {
	Button,
	TextField,
	InputAdornment,
	IconButton,
	LinearProgress,
	Divider,
} from "@mui/material";
import styles from "./styles.module.css";
import {
	ClearRounded,
	LocalPhoneRounded,
	RemoveRedEyeRounded,
	VisibilityOffRounded,
	CheckRounded,
	HelpCenterRounded,
	ArrowBackIosNewRounded,
} from "@mui/icons-material";
import SignInPassword from "./SignInPassword";
import SignInSelector from "./SignInSelector";
import SignInCode from "./SignInCode";

interface SignInPageProps {
	handleSignIn: () => void;
	handleSetPhone: (phone: string) => void;
	handleSetPassword: (password: string) => void;
	isSubmitting: boolean;
	phone: string;
	password: string;
	clearPassword: () => void;
	clearPhone: () => void;
	signInError: string;
	submitDisabled: boolean;
	handleForgotPassword: () => void;
	handleExit: () => void;
	setSignInError: React.Dispatch<React.SetStateAction<string>>;
	isFromDjInvite?: string;
	isForPurchase: boolean;
	navigateToPurchase: () => void;
	navigateToDjAccept: () => void;
	handleSignInSplitterSection: (
		roleType: "dj" | "performer",
		user: any,
		navigateTo: () => void
	) => Promise<void>;
	isForPerformerQr?: string;
	isForKeyCheckIn?: string;
	navigateToPerformerQrOrKey: () => void;
}

function SignInPage({
	handleSignIn,
	handleSetPhone,
	handleSetPassword,
	isSubmitting,
	phone,
	password,
	clearPassword,
	clearPhone,
	signInError,
	submitDisabled,
	handleForgotPassword,
	handleExit,
	setSignInError,
	isFromDjInvite,
	isForPurchase,
	navigateToPurchase,
	navigateToDjAccept,
	handleSignInSplitterSection,
	isForPerformerQr,
	isForKeyCheckIn,
	navigateToPerformerQrOrKey,
}: SignInPageProps) {
	const [selectedPage, setSelectedPage] = useState<
		"selector" | "password" | "code"
	>("selector");
	return (
		<>
			{selectedPage === "selector" ? (
				<SignInSelector
					passwordLogin={() => {
						setSelectedPage("password");
					}}
					codeLogin={() => {
						setSelectedPage("code");
					}}
					handleExit={handleExit}
				/>
			) : selectedPage === "code" ? (
				<SignInCode
					setSignInError={setSignInError}
					handleExit={() => {
						setSelectedPage("selector");
					}}
					phone={phone}
					signInError={signInError}
					handleSetPhone={handleSetPhone}
					clearPhone={clearPhone}
					isForPurchase={isForPurchase}
					isFromDjInvite={isFromDjInvite}
					navigateToPurchase={navigateToPurchase}
					navigateToDjAccept={navigateToDjAccept}
					handleSignInSplitterSection={handleSignInSplitterSection}
					isForPerformerQr={isForPerformerQr}
					isForKeyCheckIn={isForKeyCheckIn}
					navigateToPerformerQrOrKey={navigateToPerformerQrOrKey}
				/>
			) : selectedPage === "password" ? (
				<SignInPassword
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
					handleExit={() => {
						setSelectedPage("selector");
					}}
				/>
			) : null}
		</>
	);
}

export default SignInPage;
