/** @format */
"use client";

import { useEffect, useState } from "react";
import QuickSignUpNamePhoneView from "./QuickSignUpNamePhoneView";
import { useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import { useDispatch } from "react-redux";
import {
	setUsername as setUsernameSlice,
	setPhone as setPhoneSlice,
	setPassword as setPasswordSlice,
	setUsernameError as setUsernameErrorSlice,
	setPasswordError as setPasswordErrorSlice,
	setPhoneError as setPhoneErrorSlice,
	setCreateAccountDefault,
} from "@/store/createAccountSlice";
import { Auth } from "aws-amplify";
import {
	validatePassword,
	validateUsername,
	validateUsernameWithMessage,
	validatePasswordWithMessage,
	isValidPhoneNumber,
} from "@/generic_functions/validationFunctions";
import { debounce } from "lodash";
import {
	formatPhoneNumber,
	unformatPhoneNumber,
} from "@/generic_functions/formatPhoneNumber";
import { getCheckIfExistingEmailOrUsername } from "@/api_functions/getCheckIfExistingEmailOrUsername";
import { deleteAccountIfNotConfirmed } from "@/api_functions/deleteAccountIfNotConfirmed";
import { useRouter } from "next/navigation";
import { cleanWhitespace } from "@/generic_functions/validationFunctionsForForms";

interface CreateAccountContainerProps {
	userType: "promoter" | "performer" | "dj";
	backUrl: string;
	nextUrl: string;
}

function QuickSignUpNamePhoneContainer({
	userType,
	backUrl,
	nextUrl,
}: CreateAccountContainerProps) {
	const dispatch = useDispatch();
	const router = useRouter();

	const email = "empty@empty.com";
	const [snackMessage, setSnackMessage] = useState("");

	const {
		phone,
		password,
		username,
		usernameError,
		passwordError,
		phoneError,
	} = useSelector((state: RootState) => state.createAccountSlice);

	const somethingIsempty = () => {
		if (username === "") {
			return true;
		}
		if (phone === "") {
			return true;
		}
		if (password === "") {
			return true;
		}
		return false;
	};

	function setEmptyErrors() {
		if (username === "") {
			dispatch(setUsernameErrorSlice("Username cannot be empty"));
		}
		if (phone === "") {
			dispatch(setPhoneErrorSlice("Phone cannot be empty"));
		}
		if (password === "") {
			dispatch(setPasswordErrorSlice("Password cannot be empty"));
		}
	}

	async function setSignUpErrors() {
		if (!isValidPhoneNumber(phone)) {
			dispatch(setPhoneErrorSlice("Invalid phone number"));
		}
		if (!validatePassword(password)) {
			dispatch(setPasswordErrorSlice("Invalid password"));
		}
		if (!validateUsername(username)) {
			dispatch(setUsernameErrorSlice("Invalid username"));
		}
	}

	function checkIfNoErrors() {
		if (usernameError === "" && phoneError === "" && passwordError === "") {
			return true;
		} else {
			return false;
		}
	}

	const handleSignUp = async () => {
		if (somethingIsempty()) {
			setEmptyErrors();
			return;
		} else {
			await setSignUpErrors().then(async () => {
				if (checkIfNoErrors()) {
					try {
						const trimmedUsername = username.trim();
						getCheckIfExistingEmailOrUsername(email, trimmedUsername).then(
							async (res) => {
								console.log("EXISTING MESSAGE:", res);
								if (res.existingUsername) {
									dispatch(setUsernameErrorSlice("Username already exists"));
									return;
								}
								await Auth.signUp({
									username: `+1${unformatPhoneNumber(phone)}`,
									password: password,
									attributes: {
										phone_number: `+1${unformatPhoneNumber(phone)}`, // E.164 format
										email: email,
										"custom:RoleType": userType,
										"custom:DisplayUsername": trimmedUsername,
									},
								})
									.then((res) => {
										router.push(nextUrl);
									})
									.catch((err) => {
										if (err.code === "UsernameExistsException") {
											deleteAccountIfNotConfirmed(
												`+1${unformatPhoneNumber(phone)}`
											).then((res) => {
												if (res === "yes") {
													handleSignUp();
												} else {
													setSnackMessage(
														"Account with this phone number already exists"
													);
												}
											});
										} else {
											console.error("Error signing up:", err.message);
										}
									});
							}
						);
					} catch (err: any) {
						if (err.code === "UsernameExistsException") {
							setSnackMessage("Account with this phone number already exists");
						} else {
							console.error("Error signing up:", err.message);
						}
					}
				}
			});
		}
	};

	function removeWhitespace(str: string) {
		const adjusted = str.replace(/\s+/g, "");
		return adjusted;
	}

	function setUsername(event: React.ChangeEvent<HTMLInputElement>) {
		if (event.target.value.length <= 25) {
			const whitespaceCleanedUsername = cleanWhitespace(event.target.value);
			dispatch(setUsernameSlice(whitespaceCleanedUsername));
		}
	}

	function setPhone(event: React.ChangeEvent<HTMLInputElement>) {
		const adjustedValue = formatPhoneNumber(event.target.value);
		if (adjustedValue !== null) {
			dispatch(setPhoneSlice(adjustedValue));
		}
	}

	function setPassword(event: React.ChangeEvent<HTMLInputElement>) {
		dispatch(setPasswordSlice(removeWhitespace(event.target.value)));
	}

	useEffect(() => {
		const debouncedValidation = debounce(() => {
			dispatch(setUsernameErrorSlice(validateUsernameWithMessage(username)));
		}, 1000);

		debouncedValidation();
		return () => {
			debouncedValidation.cancel();
		};
	}, [username]);

	useEffect(() => {
		const debouncedValidation = debounce(() => {
			dispatch(setPasswordErrorSlice(validatePasswordWithMessage(password)));
		}, 1000);

		debouncedValidation();
		return () => {
			debouncedValidation.cancel();
		};
	}, [password]);

	useEffect(() => {
		if (phoneError !== "") {
			dispatch(setPhoneErrorSlice(""));
		}
	}, [phone]);

	function handleExit() {
		router.push(backUrl);
	}

	function clearUsername() {
		dispatch(setUsernameSlice(""));
		dispatch(setUsernameErrorSlice(""));
	}

	function clearPhone() {
		dispatch(setPhoneSlice(""));
		dispatch(setPhoneErrorSlice(""));
	}

	function clearPassword() {
		dispatch(setPasswordSlice(""));
		dispatch(setPasswordErrorSlice(""));
	}

	const signUpDisabled =
		phone === "" ||
		password === "" ||
		username === "" ||
		phoneError !== "" ||
		passwordError !== "" ||
		usernameError !== "";

	return (
		<QuickSignUpNamePhoneView
			signUpDisabled={signUpDisabled}
			handleExit={handleExit}
			phone={phone}
			password={password}
			username={username}
			usernameError={usernameError}
			passwordError={passwordError}
			phoneError={phoneError}
			handleSignUp={handleSignUp}
			setUsername={setUsername}
			setPhone={setPhone}
			setPassword={setPassword}
			snackMessage={snackMessage}
			setSnackMessage={setSnackMessage}
			accountType={userType!}
			clearUsername={clearUsername}
			clearPhone={clearPhone}
			clearPassword={clearPassword}
		/>
	);
}

export default QuickSignUpNamePhoneContainer;
