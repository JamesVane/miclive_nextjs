/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import {
	TextField,
	Button,
	InputAdornment,
	IconButton,
	Divider,
	LinearProgress,
} from "@mui/material";
import {
	EmailRounded,
	ClearRounded,
	ArrowBackIosNewRounded,
	CheckRounded,
} from "@mui/icons-material";
import { isValidEmail } from "@/generic_functions/validationFunctions";
import { Auth } from "aws-amplify";

interface ChangeEmailProps {
	currentEmail: string;
	removeWhitespace: (value: string) => string;
	email: string;
	setEmail: (email: string) => void;
	currentEmailIsVerified: boolean;
	handleSetCurrentEmailIsVerified: () => void;
}

function ChangeEmail({
	currentEmail,
	removeWhitespace,
	email,
	setEmail,
	currentEmailIsVerified,
	handleSetCurrentEmailIsVerified,
}: ChangeEmailProps) {
	const router = useRouter();

	const [emailError, setEmailError] = useState("");
	const [emailFocused, setEmailFocused] = useState(false);
	const [saveLoading, setSaveLoading] = useState(false);

	function handleSetEmail(event: React.ChangeEvent<HTMLInputElement>) {
		const adjustedValue = removeWhitespace(event.target.value);
		const adjustedValueLower = adjustedValue.toLowerCase();
		setEmail(adjustedValueLower);
	}

	function clearEmail() {
		setEmail("");
		setEmailError("");
	}

	function handleBack() {
		router.back();
	}

	async function handleSaveEmail() {
		if (!saveLoading) {
			setSaveLoading(true);
			if (!isValidEmail(email)) {
				setEmailError("Invalid Email");
				setSaveLoading(false);
			} else if (email === currentEmail) {
				setEmailError("New email must be different from previous email");
				setSaveLoading(false);
			} else {
				try {
					const user = await Auth.currentAuthenticatedUser();
					const currrentEmail = user.attributes;
				} catch {
					router.push("/sign_in");
				}
				const user = await Auth.currentAuthenticatedUser();
				const emailIsVerified = user.attributes.email_verified;
				if (emailIsVerified) {
					handleSetCurrentEmailIsVerified();
				} else if (user.attributes) {
					try {
						await Auth.updateUserAttributes(user, { email: email });
					} catch {
						setEmailError(
							"An unexpected arror occured when updating the email address"
						);
						setSaveLoading(false);
						return;
					}

					try {
						await Auth.verifyCurrentUserAttribute("email");
					} catch {
						setEmailError(
							"An unexpected arror occured when sending verification email"
						);
						setSaveLoading(false);
						return;
					}
					router.push("/confirm_email");
				} else {
					router.push("/sign_in");
				}
			}
		}
	}

	const doesNotHaveEmail = currentEmail === "empty@empty.com";

	const saveIsDisabled = emailError !== "" || email === "";

	async function handleVerifyCurrentEmail() {
		if (!saveLoading) {
			setSaveLoading(true);
			try {
				await Auth.verifyCurrentUserAttribute("email");
			} catch {
				setEmailError(
					"An unexpected arror occured when sending verification email"
				);
				setSaveLoading(false);
				return;
			}
			router.push("/confirm_email");
		}
	}

	return (
		<div className={styles.main_div}>
			<div className={styles.paper_div}>
				<Button
					onClick={handleBack}
					size="large"
					startIcon={<ArrowBackIosNewRounded />}
					color="secondary"
					sx={{
						position: "absolute",
						left: "0px",
						top: "0px",
					}}>
					back
				</Button>
				<div className={styles.header_div}>{`${
					doesNotHaveEmail ? "Add" : "Change"
				} Account Email`}</div>
				{doesNotHaveEmail ? null : (
					<div className={styles.current_email_div}>
						<div style={{ fontWeight: "bold", marginRight: "5px" }}>
							Current Email:
						</div>
						{currentEmail}
					</div>
				)}
				<TextField
					disabled={saveLoading}
					error={emailError !== ""}
					helperText={emailError}
					autoComplete="email"
					onFocus={() => setEmailFocused(true)}
					onBlur={() => setEmailFocused(false)}
					sx={{ width: "90%", margin: "10px", marginBottom: "5px" }}
					placeholder="New Email Address"
					value={email}
					label={email === "" ? "" : "New Email Address"}
					onChange={handleSetEmail}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<EmailRounded
									sx={{
										color:
											emailError !== ""
												? "error.main"
												: emailFocused
												? "primary.main"
												: "action.disabled",
									}}
								/>
							</InputAdornment>
						),
						endAdornment: (
							<InputAdornment sx={{ width: "30px" }} position="end">
								<IconButton disabled={saveLoading} onClick={clearEmail}>
									<ClearRounded
										sx={{
											color:
												emailError !== ""
													? "error.main"
													: emailFocused
													? "primary.main"
													: "action.disabled",
										}}
									/>
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				{currentEmailIsVerified || doesNotHaveEmail ? null : (
					<Button
						disabled={saveLoading}
						onClick={handleVerifyCurrentEmail}
						startIcon={<CheckRounded />}
						color="secondary"
						size="small">
						verify current email
					</Button>
				)}
				<div className={styles.bottom_divider}>
					<Divider variant="middle" flexItem />
				</div>
				<div className={styles.save_button_div}>
					<Button
						onClick={handleSaveEmail}
						sx={{
							overflow: "hidden",
							position: "relative",
						}}
						disabled={saveIsDisabled || saveLoading}
						size="large"
						variant="outlined"
						color="success"
						startIcon={<CheckRounded />}>
						{saveLoading ? (
							<LinearProgress
								color="success"
								sx={{
									position: "absolute",
									width: "100%",
									bottom: "0px",
								}}
							/>
						) : null}
						save
					</Button>
				</div>
			</div>
		</div>
	);
}

export default ChangeEmail;
