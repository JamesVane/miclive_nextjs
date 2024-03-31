/** @format */
"use client";

import { useEffect, useState } from "react";
import QuickCreatePhoneNameView from "./QuickCreatePhoneNameView";
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
import { useRouter } from "next/navigation";
import { getCheckIfExistingEmailOrUsername } from "@/api_functions_no_auth/getCheckIfExistingEmailOrUsername";
import { deleteAccountIfNotConfirmed } from "@/api_functions_no_auth/deleteAccountIfNotConfirmed";

interface CreateAccountContainerProps {
	userTypeFromParams: "promoter" | "performer" | "dj";
	cancelPath: string;
	continuePath: string;
}

function QuickCreatePhoneNameContainer({
	userTypeFromParams,
	cancelPath,
	continuePath,
}: CreateAccountContainerProps) {
	const dispatch = useDispatch();
	const router = useRouter();
	const [snackMessage, setSnackMessage] = useState("");

	const email = "empty@empty.com";

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
						getCheckIfExistingEmailOrUsername(email, username).then(
							async (res) => {
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
										"custom:RoleType": userTypeFromParams,
										"custom:DisplayUsername": username,
									},
								})
									.then(() => {
										router.push(continuePath);
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
			dispatch(setUsernameSlice(event.target.value));
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
		router.push(cancelPath);
		dispatch(setCreateAccountDefault());
	}

	return (
		<QuickCreatePhoneNameView
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
			accountType={userTypeFromParams}
		/>
	);
}

export default QuickCreatePhoneNameContainer;
