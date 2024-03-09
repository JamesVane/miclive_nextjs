/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import {
	Button,
	TextField,
	InputAdornment,
	IconButton,
	LinearProgress,
	Divider,
	CircularProgress,
	Alert,
	Snackbar,
} from "@mui/material";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
	ClearRounded,
	LocalPhoneRounded,
	CheckRounded,
	ArrowBackIosNewRounded,
	RefreshRounded,
} from "@mui/icons-material";
import { Auth } from "aws-amplify";
import { unformatPhoneNumber } from "@/generic_functions/formatPhoneNumber";
import { useDispatch } from "react-redux";
import { setCurrentSub } from "@/store/currentSubStore";
import { useRouter } from "next/navigation";

interface SignInCodeProps {
	handleExit: () => void;
	phone: string;
	signInError: string;
	handleSetPhone: (phone: string) => void;
	clearPhone: () => void;
	setSignInError: React.Dispatch<React.SetStateAction<string>>;
	isFromDjInvite?: string;
	navigateToPurchase: () => void;
	isForPurchase: boolean;
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

function SignInCode({
	handleExit,
	phone,
	signInError,
	handleSetPhone,
	clearPhone,
	setSignInError,
	isFromDjInvite,
	navigateToPurchase,
	isForPurchase,
	navigateToDjAccept,
	handleSignInSplitterSection,
	isForPerformerQr,
	isForKeyCheckIn,
	navigateToPerformerQrOrKey,
}: SignInCodeProps) {
	const dispatch = useDispatch();
	const router = useRouter();

	const [phoneIsFocused, setPhoneIsFocused] = useState(false);
	const submitDisabled = phone === "" || signInError !== "";
	const [codeSession, setCodeSession] = useState(null);
	const [phoneCode, setPhoneCode] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [sentCodeMessage, setSentCodeMessage] = useState("");

	async function handleSendCode() {
		setIsSubmitting(true);
		try {
			const session = await Auth.signIn(`+1${unformatPhoneNumber(phone)}`);
			console.log("session:", session);
			setCodeSession(session);
			setIsSubmitting(false);
		} catch {
			setSignInError("Invalid phone number, please try again");
			setIsSubmitting(false);
		}
	}

	const validateChar = (value: string) => {
		if (value.match(/^[0-9]+$/)) {
			return true;
		} else {
			return false;
		}
	};

	async function verifyOtpCode(inputPhoneCode: string) {
		setIsSubmitting(true);
		if (!isSubmitting) {
			try {
				const user = await Auth.sendCustomChallengeAnswer(
					codeSession,
					inputPhoneCode
				);
				if (user.attributes) {
					const userSub = user.attributes.sub;
					const roleType = user.attributes["custom:RoleType"];
					if (isFromDjInvite) {
						handleSignInSplitterSection("dj", user, navigateToDjAccept);
					} else if (isForKeyCheckIn) {
						handleSignInSplitterSection(
							"performer",
							user,
							navigateToPerformerQrOrKey
						);
					} else if (isForPerformerQr) {
						handleSignInSplitterSection(
							"performer",
							user,
							navigateToPerformerQrOrKey
						);
					} else if (isForPurchase) {
						handleSignInSplitterSection("performer", user, navigateToPurchase);
					} else {
						if (user.attributes["custom:RoleId"]) {
							dispatch(setCurrentSub(userSub));
							router.push(`/m/${roleType}`);
							setIsSubmitting(false);
							setSignInError("");
						} else {
							dispatch(setCurrentSub(userSub));
							setSignInError(
								"Your account has incomplete information. Please email support@mic.live and we will get the issue fixed as ASAP"
							);
							setIsSubmitting(false);
							setSignInError("");
						}
					}
				} else {
					setSignInError("Invalid code, please try again");
					setPhoneCode("");
					setIsSubmitting(false);
				}
			} catch {
				setSignInError("Invalid code, please try again");
				setPhoneCode("");
				setIsSubmitting(false);
			}
		}
	}

	async function reSendCode() {
		setIsSubmitting(true);
		try {
			const session = await Auth.signIn(`+1${unformatPhoneNumber(phone)}`);
			console.log("session:", session);
			setCodeSession(session);
			setSentCodeMessage("Confirmation code resent successfully!");
			setIsSubmitting(false);
		} catch {
			setSentCodeMessage("Code failed to send.");
			setIsSubmitting(false);
		}
	}

	return (
		<>
			<Snackbar
				open={sentCodeMessage !== ""}
				autoHideDuration={6000}
				onClose={() => setSentCodeMessage("")}>
				<Alert
					sx={{
						display: sentCodeMessage === "" ? "none" : "flex",
					}}
					severity={
						sentCodeMessage === "Confirmation code resent successfully!"
							? "success"
							: "error"
					}>
					{sentCodeMessage}
				</Alert>
			</Snackbar>
			{codeSession ? (
				<>
					{isSubmitting ? (
						<div className={styles.loading_div}>
							<CircularProgress
								size={100}
								sx={{ marginBottom: "20px" }}
								color="primary"
							/>
							Loading...
						</div>
					) : null}
					<div className={styles.header_div}>
						<Button
							onClick={() => {
								setCodeSession(null);
							}}
							startIcon={<ArrowBackIosNewRounded />}
							color="secondary"
							size="large"
							sx={{ position: "absolute", top: "0px", left: "0px" }}>
							back
						</Button>
						Check In Code
					</div>
					<div className={styles.confirm_input_div}>
						<div className={styles.confirm_input_div_ninety}>
							<MuiOtpInput
								length={6}
								autoFocus
								value={phoneCode}
								onChange={(value) => {
									setSignInError("");
									setPhoneCode(value);
								}}
								validateChar={validateChar}
								onComplete={verifyOtpCode}
							/>
						</div>
					</div>
					<div className={styles.phone_number_display}>{phone}</div>
					<div className={styles.re_send_code_div}>
						<Button
							onClick={reSendCode}
							color="secondary"
							sx={{ marginTop: "10px" }}
							startIcon={<RefreshRounded />}
							size="large">
							Re-send code
						</Button>
					</div>
				</>
			) : (
				<>
					<div className={styles.header_div}>
						<Button
							onClick={handleExit}
							startIcon={<ArrowBackIosNewRounded />}
							color="secondary"
							size="large"
							sx={{ position: "absolute", top: "0px", left: "0px" }}>
							back
						</Button>
						Sign-In With Code
					</div>
					<div className={styles.code_div}>
						<TextField
							onFocus={() => setPhoneIsFocused(true)}
							onBlur={() => setPhoneIsFocused(false)}
							disabled={isSubmitting}
							error={signInError !== ""}
							value={phone}
							helperText={signInError}
							onChange={(e: any) => handleSetPhone(e.target.value)}
							placeholder="Phone Number"
							label="Phone Number"
							sx={{
								width: "90%",
								marginBottom: "20px",
							}}
							InputProps={{
								startAdornment: (
									<InputAdornment position="start">
										<LocalPhoneRounded
											sx={{
												color:
													signInError !== ""
														? "error.main"
														: phoneIsFocused
														? "primary.main"
														: "action.disabled",
											}}
										/>
									</InputAdornment>
								),
								endAdornment: (
									<InputAdornment sx={{ width: "30px" }} position="end">
										<IconButton disabled={isSubmitting} onClick={clearPhone}>
											<ClearRounded
												sx={{
													color:
														signInError !== ""
															? "error.main"
															: phoneIsFocused
															? "primary.main"
															: "action.disabled",
												}}
											/>
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
					</div>
					<div className={styles.bottom_div}>
						<div
							className={styles.divider_div}
							style={{ height: isSubmitting ? "4px" : "2px" }}>
							{isSubmitting ? (
								<LinearProgress color="primary" sx={{ width: "100%" }} />
							) : (
								<Divider variant="middle" flexItem />
							)}
						</div>
						<div className={styles.bottom_buttons}>
							<Button
								disabled={isSubmitting || submitDisabled}
								onClick={handleSendCode}
								startIcon={<CheckRounded />}
								size="large"
								variant="outlined"
								color="success">
								send code
							</Button>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default SignInCode;
