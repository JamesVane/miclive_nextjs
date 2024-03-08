/** @format */
"use client";

import { useState, useEffect } from "react";
import styles from "./styles.module.css";
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
	isFromDjInvite: boolean;
	isForPurchase: boolean;
	navigateToPurchase: () => void;
	navigateToDjAccept: () => void;
	handleCreateRole: (
		userType: "dj" | "performer" | "promoter",
		user: any
	) => Promise<void>;
	fromUrl: any;
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
	handleCreateRole,
	fromUrl,
}: SignInPageProps) {
	const [selectedPage, setSelectedPage] = useState<
		"selector" | "password" | "code"
	>("selector");
	return (
		<div className={styles.main_div}>
			<div className={styles.paper_container}>
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
						handleCreateRole={handleCreateRole}
						fromUrl={fromUrl}
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
			</div>
		</div>
	);
}

export default SignInPage;
