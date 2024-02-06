/** @format */
"use client";

import { useEffect, useState } from "react";
import CreateAccount from "./CreateAccount";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { useDispatch } from "react-redux";
import {
	setUsername as setUsernameSlice,
	setPhone as setPhoneSlice,
	setEmail as setEmailSlice,
	setPassword as setPasswordSlice,
	setConfirmPassword as setConfirmPasswordSlice,
	setUsernameError as setUsernameErrorSlice,
	setPasswordError as setPasswordErrorSlice,
	setConfirmPasswordError as setConfirmPasswordErrorSlice,
	setEmailError as setEmailErrorSlice,
	setPhoneError as setPhoneErrorSlice,
	setCreateAccountDefault,
} from "@/store/createAccountSlice";
import { Auth } from "aws-amplify";
import {
	isValidEmail,
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
	isForPurchase?: boolean;
	forDjDateInvite?: boolean;
	forDjEventInvite?: boolean;
	userType: "promoter" | "performer" | "dj";
	eventNameParam?: string;
	keyParam?: string;
}

function CreateAccountContainer({
	isForPurchase,
	forDjDateInvite,
	forDjEventInvite,
	userType,
	eventNameParam,
	keyParam,
}: CreateAccountContainerProps) {
	const dispatch = useDispatch();
	const router = useRouter();

	const [snackMessage, setSnackMessage] = useState("");

	const {
		phone,
		email,
		password,
		confirmPassword,
		username,
		usernameError,
		passwordError,
		confirmPasswordError,
		phoneError,
		emailError,
	} = useSelector((state: RootState) => state.createAccount);

	const somethingIsempty = () => {
		if (username === "") {
			return true;
		}
		if (phone === "") {
			return true;
		}
		if (email === "") {
			return true;
		}
		if (password === "") {
			return true;
		}
		if (confirmPassword === "") {
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
		if (email === "") {
			dispatch(setEmailErrorSlice("Email cannot be empty"));
		}
		if (password === "") {
			dispatch(setPasswordErrorSlice("Password cannot be empty"));
		}
		if (confirmPassword === "") {
			dispatch(
				setConfirmPasswordErrorSlice("Confirm Password cannot be empty")
			);
		}
	}

	async function setSignUpErrors() {
		if (!isValidPhoneNumber(phone)) {
			dispatch(setPhoneErrorSlice("Invalid phone number"));
		}
		if (!isValidEmail(email)) {
			dispatch(setEmailErrorSlice("Invalid email"));
		}
		if (!validatePassword(password)) {
			dispatch(setPasswordErrorSlice("Invalid password"));
		}
		if (!validateUsername(username)) {
			dispatch(setUsernameErrorSlice("Invalid username"));
		}
	}

	function checkIfNoErrors() {
		if (
			usernameError === "" &&
			phoneError === "" &&
			emailError === "" &&
			passwordError === "" &&
			confirmPasswordError === ""
		) {
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
				if (password !== confirmPassword) {
					dispatch(setConfirmPasswordErrorSlice("Passwords do not match"));
					return;
				} else if (checkIfNoErrors()) {
					try {
						const trimmedUsername = username.trim();
						getCheckIfExistingEmailOrUsername(email, trimmedUsername).then(
							async (res) => {
								if (res.existingEmail) {
									dispatch(setEmailErrorSlice("Email already exists"));
									return;
								}
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
										"custom:RoleType": isForPurchase
											? "performer"
											: forDjDateInvite
											? "dj"
											: forDjEventInvite
											? "dj"
											: userType,
										"custom:DisplayUsername": trimmedUsername,
									},
								})
									.then((res) => {
										if (isForPurchase) {
											router.push(`/buy_ticket/confirm/${keyParam}`);
										} else if (forDjDateInvite) {
											router.push(`/dj_accept_date/${keyParam}/confirm`);
										} else if (forDjEventInvite) {
											router.push(`/dj_accept_event/${keyParam}/confirm`);
										} else {
											router.push(`/confirm/${userType}`);
										}
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

	function setEmail(event: React.ChangeEvent<HTMLInputElement>) {
		const adjustedValue = removeWhitespace(event.target.value);
		dispatch(setEmailSlice(adjustedValue));
	}

	function setPassword(event: React.ChangeEvent<HTMLInputElement>) {
		dispatch(setPasswordSlice(removeWhitespace(event.target.value)));
	}

	function setConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
		dispatch(setConfirmPasswordSlice(removeWhitespace(event.target.value)));
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
		if (emailError !== "") {
			dispatch(setEmailErrorSlice(""));
		}
	}, [email]);

	useEffect(() => {
		if (phoneError !== "") {
			dispatch(setPhoneErrorSlice(""));
		}
	}, [phone]);

	useEffect(() => {
		if (confirmPasswordError !== "") {
			dispatch(setConfirmPasswordErrorSlice(""));
		}
	}, [confirmPassword]);

	function handleExit() {
		if (isForPurchase) {
			router.push(`event/${eventNameParam}/${keyParam}`);
			dispatch(setCreateAccountDefault());
		} else if (forDjDateInvite) {
			router.push(`/dj_accept_date/${keyParam}`);
			dispatch(setCreateAccountDefault());
		} else if (forDjEventInvite) {
			router.push(`/dj_accept_event/${keyParam}`);
			dispatch(setCreateAccountDefault());
		} else {
			router.push("/");
			dispatch(setCreateAccountDefault());
		}
	}

	function clearUsername() {
		dispatch(setUsernameSlice(""));
		dispatch(setUsernameErrorSlice(""));
	}

	function clearPhone() {
		dispatch(setPhoneSlice(""));
		dispatch(setPhoneErrorSlice(""));
	}

	function clearEmail() {
		dispatch(setEmailSlice(""));
		dispatch(setEmailErrorSlice(""));
	}

	function clearPassword() {
		dispatch(setPasswordSlice(""));
		dispatch(setPasswordErrorSlice(""));
	}

	function clearConfirmPassword() {
		dispatch(setConfirmPasswordSlice(""));
		dispatch(setConfirmPasswordErrorSlice(""));
	}

	return (
		<CreateAccount
			handleExit={handleExit}
			phone={phone}
			email={email}
			password={password}
			confirmPassword={confirmPassword}
			username={username}
			usernameError={usernameError}
			passwordError={passwordError}
			confirmPasswordError={confirmPasswordError}
			phoneError={phoneError}
			emailError={emailError}
			handleSignUp={handleSignUp}
			setUsername={setUsername}
			setPhone={setPhone}
			setEmail={setEmail}
			setPassword={setPassword}
			setConfirmPassword={setConfirmPassword}
			snackMessage={snackMessage}
			setSnackMessage={setSnackMessage}
			accountType={
				isForPurchase
					? "performer"
					: forDjEventInvite
					? "dj"
					: forDjDateInvite
					? "dj"
					: userType!
			}
			clearUsername={clearUsername}
			clearPhone={clearPhone}
			clearEmail={clearEmail}
			clearPassword={clearPassword}
			clearConfirmPassword={clearConfirmPassword}
		/>
	);
}

export default CreateAccountContainer;
