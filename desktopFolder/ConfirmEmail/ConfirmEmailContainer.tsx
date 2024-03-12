/** @format */
"use client";

import { useState, useEffect } from "react";
import ConfirmEmail from "./ConfirmEmail";
import EmailIsNowVerified from "./EmailIsNowVerified";
import SplashPage from "@/SplashPage";
import { useRouter } from "next/navigation";
import { Auth } from "aws-amplify";
import { Snackbar, Alert } from "@mui/material";

function ConfirmEmailContainer() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(true);
	const [currentEmail, setCurrentEmail] = useState("");
	const [emailConfirmCode, setEmailConfirmCode] = useState("");
	const [somehtingIsGoingOn, setSomehtingIsGoingOn] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [resendCodeLoading, setResendCodeLoading] = useState(false);
	const [resendSnackMessage, setResendSnackMessage] = useState("");
	const [emailIsNowVerified, setEmailIsNowVerified] = useState(false);

	useEffect(() => {
		async function getUserEmail() {
			try {
				const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
				const currrentEmail = user.attributes.email;
				setCurrentEmail(currrentEmail);
				const emailIsVerified = user.attributes.email_verified;
				if (emailIsVerified) {
					setEmailIsNowVerified(true);
				}
				setIsLoading(false);
			} catch {
				router.push("/sign_in");
			}
		}
		getUserEmail();
	}, []);

	const validateChar = (value: string) => {
		if (value.match(/^[0-9]+$/)) {
			return true;
		} else {
			return false;
		}
	};

	async function handleConfirmation(emailCode: string) {
		if (!somehtingIsGoingOn && !resendCodeLoading) {
			setSomehtingIsGoingOn(true);
			try {
				const user = await Auth.currentAuthenticatedUser();
			} catch {
				router.push("/sign_in");
			}
			try {
				await Auth.verifyCurrentUserAttributeSubmit("email", emailCode);
			} catch {
				setErrorMessage("Invalid code");
				setSomehtingIsGoingOn(false);
				return;
			}
			setEmailIsNowVerified(true);
			setSomehtingIsGoingOn(false);
		}
	}

	async function handleResendCode() {
		if (!resendCodeLoading && !somehtingIsGoingOn) {
			setResendCodeLoading(true);
			try {
				const user = await Auth.currentAuthenticatedUser();
			} catch {
				router.push("/sign_in");
			}
			const user = await Auth.currentAuthenticatedUser();
			if (user.attributes) {
				try {
					await Auth.verifyCurrentUserAttribute("email");
				} catch (error: any) {
					if (
						error.message ===
						"Attempt limit exceeded, please try after some time."
					) {
						setResendSnackMessage(
							"Please wait before re-sending confirmation code"
						);
					} else {
						setResendSnackMessage("Failed to re-send confirmation code email");
					}

					setResendCodeLoading(false);
					return;
				}
				setResendSnackMessage("Code re-sent successfully!");
				setResendCodeLoading(false);
			} else {
				router.push("/sign_in");
			}
		}
	}

	const resendCodeSuccess = resendSnackMessage === "Code re-sent successfully!";

	return (
		<>
			<Snackbar
				open={resendSnackMessage !== ""}
				autoHideDuration={6000}
				onClose={() => setResendSnackMessage("")}>
				<Alert
					sx={{
						display: resendSnackMessage === "" ? "none" : "flex",
					}}
					severity={
						resendSnackMessage === "Code re-sent successfully!"
							? "success"
							: "error"
					}>
					{resendSnackMessage}
				</Alert>
			</Snackbar>
			{isLoading ? (
				<SplashPage />
			) : (
				<>
					{emailIsNowVerified ? (
						<EmailIsNowVerified currentEmail={currentEmail} />
					) : (
						<ConfirmEmail
							setEmailConfirmCode={setEmailConfirmCode}
							emailConfirmCode={emailConfirmCode}
							validateChar={validateChar}
							handleConfirmation={handleConfirmation}
							currentEmail={currentEmail}
							somehtingIsGoingOn={somehtingIsGoingOn}
							errorMessage={errorMessage}
							resendCodeLoading={resendCodeLoading}
							handleResendCode={handleResendCode}
							resendCodeSuccess={resendCodeSuccess}
						/>
					)}
				</>
			)}
		</>
	);
}

export default ConfirmEmailContainer;
