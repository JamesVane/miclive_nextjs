/** @format */
"use client";

import React, { useEffect } from "react";
import ForgotPasswordPage from "./ForgotPasswordPage";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import {
	formatPhoneNumber,
	unformatPhoneNumber,
} from "@/generic_functions/formatPhoneNumber";
import {
	setForgotPasswordError,
	setForgotPasswordNewPassword,
	setForgotPasswordResetCode,
	setForgotPasswordPhone,
	setForgotPasswordPhoneIsValid,
	setForgotPasswordStep,
} from "@/store/forgotPasswordSlice";
import {
	isValidPhoneNumber,
	validatePasswordWithMessage,
} from "@/generic_functions/validationFunctions";
import { Auth } from "aws-amplify";
import ForgotPasswordConfirm from "./ForgotPasswordConfirm";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import PasswordResetSuccessPage from "./PasswordResetSuccessPage";

interface ForgotPasswordContainerProps {
	settingFromNoPassword?: boolean;
}

function ForgotPasswordContainer({
	settingFromNoPassword,
}: ForgotPasswordContainerProps) {
	const router = useRouter();
	const dispatch = useDispatch();

	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [snackMessage, setSnackMessage] = React.useState("");

	const {
		phone,
		resetCode,
		newPassword,
		forgotPasswordError,
		phoneIsValid,
		step,
	} = useSelector((state: RootState) => state.forgotPasswordSlice);

	function removeWhitespace(str: string) {
		const adjusted = str.replace(/\s+/g, "");
		return adjusted;
	}

	function handleSetPhone(phone: string) {
		const adjustedValue = formatPhoneNumber(phone);
		if (adjustedValue !== null) {
			dispatch(setForgotPasswordError(""));
			dispatch(setForgotPasswordPhone(adjustedValue));
		}
	}

	function handleSetPhoneCode(phoneCode: string) {
		dispatch(setForgotPasswordResetCode(phoneCode));
		dispatch(setForgotPasswordError(""));
	}

	function handleSetNewPassword(password: string) {
		dispatch(setForgotPasswordNewPassword(removeWhitespace(password)));
		dispatch(setForgotPasswordError(""));
	}

	const validateChar = (value: string) => {
		if (value.match(/^[0-9]+$/)) {
			return true;
		} else {
			return false;
		}
	};

	const handleSendResetCode = async () => {
		try {
			await Auth.forgotPassword(`+1${unformatPhoneNumber(phone)}`);
			dispatch(setForgotPasswordResetCode(""));
			dispatch(setForgotPasswordStep(2));
		} catch (error: any) {
			dispatch(setForgotPasswordError(error.message));
		}
	};

	const confirmReset = async () => {
		setIsSubmitting(true);
		try {
			const returnObj = await Auth.forgotPasswordSubmit(
				`+1${unformatPhoneNumber(phone)}`,
				resetCode,
				newPassword
			);
			if (returnObj === "SUCCESS") {
				const user = await Auth.signIn(
					`+1${unformatPhoneNumber(phone)}`,
					newPassword
				);
				await Auth.updateUserAttributes(user, {
					"custom:hasPasswordSet": "true",
				});
				setIsSubmitting(false);
				dispatch(setForgotPasswordStep(3));
			}
		} catch (error: any) {
			dispatch(setForgotPasswordError(error.message));
			setIsSubmitting(false);
		}
	};

	async function resendResetCode(): Promise<void> {
		try {
			await Auth.forgotPassword(`+1${unformatPhoneNumber(phone)}`);
			setSnackMessage("Password reset code resent successfully");
		} catch (error: any) {
			dispatch(setForgotPasswordError(error.message));
		}
	}

	function clearPhone() {
		dispatch(setForgotPasswordPhone(""));
		dispatch(setForgotPasswordError(""));
	}

	function clearPassword() {
		dispatch(setForgotPasswordNewPassword(""));
		dispatch(setForgotPasswordError(""));
	}

	useEffect(() => {
		dispatch(setForgotPasswordPhoneIsValid(isValidPhoneNumber(phone)));
	}, [phone]);

	useEffect(() => {
		const debouncedValidation = debounce(() => {
			dispatch(
				setForgotPasswordError(validatePasswordWithMessage(newPassword))
			);
		}, 1000); // 1 second delay

		debouncedValidation();
		return () => {
			debouncedValidation.cancel();
		};
	}, [newPassword]);

	const submitDisabled =
		isSubmitting ||
		forgotPasswordError !== "" ||
		resetCode.length !== 6 ||
		newPassword.length < 8;

	function handleBack() {
		dispatch(setForgotPasswordStep(1));
	}
	async function handleExit() {
		if (settingFromNoPassword) {
			try {
				const currentUser = await Auth.currentAuthenticatedUser();
				const roleType = currentUser.attributes["custom:RoleType"];
				router.push(`/${roleType}`);
			} catch {
				router.push("/sign_in");
			}
		} else {
			router.push("/sign_in");
		}
	}

	return (
		<div>
			{step === 1 ? (
				<ForgotPasswordPage
					isSubmitting={isSubmitting}
					forgotPasswordError={forgotPasswordError}
					clearPhone={clearPhone}
					handleSetPhone={handleSetPhone}
					phone={phone}
					phoneIsValid={phoneIsValid}
					handleSendResetCode={handleSendResetCode}
					handleExit={handleExit}
					settingFromNoPassword={settingFromNoPassword}
				/>
			) : step === 2 ? (
				<ForgotPasswordConfirm
					isSubmitting={isSubmitting}
					resetCode={resetCode}
					handleSetPhoneCode={handleSetPhoneCode}
					validateChar={validateChar}
					forgotPasswordError={forgotPasswordError}
					clearPassword={clearPassword}
					newPassword={newPassword}
					handleSetNewPassword={handleSetNewPassword}
					setSnackMessage={setSnackMessage}
					snackMessage={snackMessage}
					resendResetCode={resendResetCode}
					confirmReset={confirmReset}
					submitDisabled={submitDisabled}
					handleBack={handleBack}
				/>
			) : step === 3 ? (
				<PasswordResetSuccessPage
					settingFromNoPassword={settingFromNoPassword}
					handleLogInRedirect={handleExit}
				/>
			) : null}
		</div>
	);
}

export default ForgotPasswordContainer;
