/** @format */

import React, { useState } from "react";
import {
	Button,
	TextField,
	InputAdornment,
	IconButton,
	LinearProgress,
	Divider,
} from "@mui/material";
import styles from "./styles.module.css";
import {
	ClearRounded,
	LocalPhoneRounded,
	RemoveRedEyeRounded,
	VisibilityOffRounded,
	CheckRounded,
	HelpCenterRounded,
	ArrowBackIosNewRounded,
} from "@mui/icons-material";

interface SignInPasswordProps {
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
}

function SignInPassword({
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
}: SignInPasswordProps) {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const [whatIsFocused, setWhatIsFocused] = useState({
		password: false,
		phone: false,
	});

	function handleWhatIsFocused(key: string, value: boolean) {
		setWhatIsFocused({ ...whatIsFocused, [key]: value });
	}
	return (
		<>
			<div className={styles.main_div}>
				<div className={styles.header_div}>
					<Button
						onClick={handleExit}
						startIcon={<ArrowBackIosNewRounded />}
						color="secondary"
						size="small"
						sx={{ position: "absolute", top: "0px", left: "0px" }}>
						back
					</Button>
					Sign-In
				</div>
				<TextField
					onFocus={() => handleWhatIsFocused("phone", true)}
					onBlur={() => handleWhatIsFocused("phone", false)}
					disabled={isSubmitting}
					error={signInError !== ""}
					value={phone}
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
												: whatIsFocused.phone
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
													: whatIsFocused.phone
													? "primary.main"
													: "action.disabled",
										}}
									/>
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<TextField
					onFocus={() => handleWhatIsFocused("password", true)}
					onBlur={() => handleWhatIsFocused("password", false)}
					disabled={isSubmitting}
					error={signInError !== ""}
					value={password}
					onChange={(e: any) => handleSetPassword(e.target.value)}
					placeholder="Password"
					label="Password"
					type={passwordVisible ? "text" : "password"}
					sx={{
						width: "90%",
					}}
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<IconButton onClick={() => setPasswordVisible((prev) => !prev)}>
									{!passwordVisible ? (
										<VisibilityOffRounded
											sx={{
												color:
													signInError !== ""
														? "error.main"
														: whatIsFocused.password
														? "primary.main"
														: "action.disabled",
											}}
										/>
									) : (
										<RemoveRedEyeRounded
											sx={{
												color:
													signInError !== ""
														? "error.main"
														: whatIsFocused.password
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
												signInError !== ""
													? "error.main"
													: whatIsFocused.password
													? "primary.main"
													: "action.disabled",
										}}
									/>
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<div className={styles.error_div}>{signInError}</div>
				<Button
					onClick={handleForgotPassword}
					endIcon={<HelpCenterRounded />}
					color="secondary">
					forgot password
				</Button>
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
						onClick={handleSignIn}
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

export default SignInPassword;
