/** @format */

import React, { useState, useRef } from "react";
import styles from "./styles.module.css";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
	TextField,
	InputAdornment,
	IconButton,
	Button,
	Divider,
	Snackbar,
	Alert,
	LinearProgress,
} from "@mui/material";
import {
	VisibilityOffRounded,
	RemoveRedEyeRounded,
	ClearRounded,
	RefreshRounded,
	CheckRounded,
	ArrowBackIosNewRounded,
} from "@mui/icons-material";

interface ForgotPasswordConfirmProps {
	resetCode: string;
	handleSetPhoneCode: (phoneCode: string) => void;
	validateChar: (char: string) => boolean;
	forgotPasswordError: string;
	isSubmitting: boolean;
	clearPassword: () => void;
	newPassword: string;
	handleSetNewPassword: (newPassword: string) => void;
	snackMessage: string;
	setSnackMessage: React.Dispatch<React.SetStateAction<string>>;
	resendResetCode: () => void;
	confirmReset: () => void;
	submitDisabled: boolean;
	handleBack: () => void;
}

function ForgotPasswordConfirm({
	resetCode,
	handleSetPhoneCode,
	validateChar,
	forgotPasswordError,
	isSubmitting,
	clearPassword,
	newPassword,
	handleSetNewPassword,
	snackMessage,
	setSnackMessage,
	resendResetCode,
	confirmReset,
	submitDisabled,
	handleBack,
}: ForgotPasswordConfirmProps) {
	const [passwordIsFocused, setPasswordIsFocused] = useState(false);
	const [passwordVisible, setPasswordVisible] = useState(false);

	const passwordRef = useRef<HTMLInputElement>(null);

	return (
		<>
			<Snackbar
				sx={{ marginBottom: "70px" }}
				open={snackMessage !== ""}
				autoHideDuration={6000}
				onClose={() => setSnackMessage("")}>
				<Alert severity="success">{snackMessage}</Alert>
			</Snackbar>
			<div className={styles.main_div}>
				<div className={styles.header_div}>
					<Button
						onClick={handleBack}
						startIcon={<ArrowBackIosNewRounded />}
						color="secondary"
						size="small"
						sx={{ position: "absolute", top: "0px", left: "0px" }}>
						back
					</Button>
					Confirm Password
				</div>
				<div className={styles.confirm_input_div}>
					<MuiOtpInput
						length={6}
						autoFocus
						value={resetCode}
						onChange={(value) => handleSetPhoneCode(value)}
						validateChar={validateChar}
						onComplete={() => {
							if (passwordRef.current) {
								passwordRef.current.focus(); // Step 2: Use the ref to change focus
							}
						}}
					/>
				</div>
				<Button
					onClick={resendResetCode}
					sx={{ marginTop: "10px" }}
					color="secondary"
					endIcon={<RefreshRounded />}>
					re-send code
				</Button>
				<div className={styles.divider_div}>
					<Divider variant="middle" flexItem />
				</div>
				<div className={styles.new_password_div}>
					<TextField
						inputRef={passwordRef}
						onFocus={() => setPasswordIsFocused(true)}
						onBlur={() => setPasswordIsFocused(false)}
						disabled={isSubmitting}
						error={forgotPasswordError !== ""}
						value={newPassword}
						onChange={(e: any) => handleSetNewPassword(e.target.value)}
						placeholder="Password"
						label="Password"
						type={passwordVisible ? "text" : "password"}
						sx={{
							width: "90%",
						}}
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<IconButton
										onClick={() => setPasswordVisible((prev) => !prev)}>
										{!passwordVisible ? (
											<VisibilityOffRounded
												sx={{
													color:
														forgotPasswordError !== ""
															? "error.main"
															: passwordIsFocused
															? "primary.main"
															: "action.disabled",
												}}
											/>
										) : (
											<RemoveRedEyeRounded
												sx={{
													color:
														forgotPasswordError !== ""
															? "error.main"
															: passwordIsFocused
															? "primary.main"
															: "action.disabled",
												}}
											/>
										)}
									</IconButton>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment sx={{ width: "30px" }} position="end">
									<IconButton disabled={isSubmitting} onClick={clearPassword}>
										<ClearRounded
											sx={{
												color:
													forgotPasswordError !== ""
														? "error.main"
														: passwordIsFocused
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
				<div className={styles.error_div}>{forgotPasswordError}</div>
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
						disabled={submitDisabled}
						onClick={confirmReset}
						startIcon={<CheckRounded />}
						size="large"
						variant="outlined"
						color="success">
						submit
					</Button>
				</div>
			</div>
		</>
	);
}

export default ForgotPasswordConfirm;
