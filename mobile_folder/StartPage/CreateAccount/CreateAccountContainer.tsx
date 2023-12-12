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
import { useRouter } from "next/navigation";
import { getCheckIfExistingEmailOrUsername } from "@/api_functions/getCheckIfExistingEmailOrUsername";
import { deleteAccountIfNotConfirmed } from "@/api_functions/deleteAccountIfNotConfirmed";

interface CreateAccountContainerProps {
	isForPurchase?: boolean;
	forDjDateInvite?: boolean;
	forDjEventInvite?: boolean;
	forPerformerQr?: boolean;
	forPerformerKeyCheckin?: boolean;
	userTypeFromParams: "promoter" | "performer" | "dj";
	keyFromParams?: string;
	eventNameFromParams?: string;
	uuidFromParams?: string;
}

function CreateAccountContainer({
	isForPurchase,
	forDjDateInvite,
	forDjEventInvite,
	forPerformerQr,
	forPerformerKeyCheckin,
	userTypeFromParams,
	keyFromParams,
	eventNameFromParams,
	uuidFromParams,
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
						getCheckIfExistingEmailOrUsername(email, username).then(
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
											: forPerformerKeyCheckin
											? "performer"
											: forPerformerQr
											? "performer"
											: forDjDateInvite
											? "dj"
											: forDjEventInvite
											? "dj"
											: userTypeFromParams,
										"custom:DisplayUsername": username,
									},
								})
									.then(() => {
										const navigatePath = isForPurchase
											? `/buy_ticket/confirm/${keyFromParams}`
											: forDjDateInvite
											? `/dj_accept_date/${keyFromParams}/confirm`
											: forDjEventInvite
											? `/dj_accept_event/${keyFromParams}/confirm`
											: forPerformerQr
											? `/checkinqr/${uuidFromParams}/confirm`
											: forPerformerKeyCheckin
											? `/walkin_key/${keyFromParams}/confirm`
											: `/confirm/${userTypeFromParams}`;

										router.push(navigatePath);
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
		const navigatePath = isForPurchase
			? `/event/${eventNameFromParams}/${keyFromParams}`
			: forDjDateInvite
			? `/dj_accept_date/${keyFromParams}`
			: forDjEventInvite
			? `/dj_accept_event/${keyFromParams}`
			: forPerformerKeyCheckin
			? `/walkin_key/${keyFromParams}`
			: forPerformerQr
			? `/checkinqr/${uuidFromParams}`
			: "/";

		router.push(navigatePath);
		dispatch(setCreateAccountDefault());
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
					: forPerformerQr
					? "performer"
					: forPerformerKeyCheckin
					? "performer"
					: forDjEventInvite
					? "dj"
					: forDjDateInvite
					? "dj"
					: userTypeFromParams
			}
		/>
	);
}

export default CreateAccountContainer;
