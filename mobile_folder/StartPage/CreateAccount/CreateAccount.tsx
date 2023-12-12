/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import {
	TextField,
	Button,
	InputAdornment,
	IconButton,
	Divider,
	Snackbar,
	Alert,
} from "@mui/material";
import {
	LocalPhoneRounded,
	EmailRounded,
	VisibilityRounded,
	AccountBoxRounded,
	VisibilityOffRounded,
	CheckRounded,
	ClearRounded,
	ArrowBackIosNewRounded,
} from "@mui/icons-material";

interface CreateAccountProps {
	phone: string;
	email: string;
	password: string;
	confirmPassword: string;
	username: string;
	usernameError: string;
	passwordError: string;
	confirmPasswordError: string;
	phoneError: string;
	emailError: string;
	handleSignUp: () => void;
	setUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setPhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setEmail: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setConfirmPassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
	snackMessage: string;
	setSnackMessage: React.Dispatch<React.SetStateAction<string>>;
	handleExit: () => void;
	accountType: string;
}

function CreateAccount({
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
	handleSignUp,
	setUsername,
	setPhone,
	setEmail,
	setPassword,
	setConfirmPassword,
	snackMessage,
	setSnackMessage,
	handleExit,
	accountType,
}: CreateAccountProps) {
	const [whatIsFocused, setWhatIsFocused] = useState({
		username: false,
		phone: false,
		email: false,
		password: false,
		confirmPassword: false,
	});
	const [isHidden, setIsHidden] = useState(true);
	const [isConfirmHidden, setIsConfirmHidden] = useState(true);

	function handleWhatIsFocused(key: string, value: boolean) {
		setWhatIsFocused({ ...whatIsFocused, [key]: value });
	}

	const textFieldStyles = {
		width: "90%",
		margin: "10px",
		marginBottom: "20px",
	};

	return (
		<>
			<Snackbar
				sx={{ marginBottom: "70px" }}
				open={snackMessage !== ""}
				autoHideDuration={6000}
				onClose={() => setSnackMessage("")}>
				<Alert severity="error">{snackMessage}</Alert>
			</Snackbar>
			<div className={styles.main_div}>
				<div className={styles.header_div}>
					<Button
						startIcon={<ArrowBackIosNewRounded />}
						onClick={handleExit}
						color="secondary"
						sx={{ position: "absolute", left: "0", top: "0" }}>
						back
					</Button>
					{`Create ${accountType} Account`}
				</div>
				<div className={styles.divider_div}>
					<Divider variant="middle" flexItem />
				</div>
				<div>
					<form className={styles.body_div}>
						<TextField
							error={usernameError !== ""}
							autoComplete="username"
							onFocus={() => handleWhatIsFocused("username", true)}
							onBlur={() => handleWhatIsFocused("username", false)}
							sx={textFieldStyles}
							placeholder="Username"
							value={username}
							type="string"
							onChange={setUsername}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<AccountBoxRounded
											sx={{
												color:
													usernameError !== ""
														? "error.main"
														: whatIsFocused.username
														? "primary.main"
														: "action.disabled",
											}}
										/>
									</InputAdornment>
								),
							}}
						/>
						{usernameError === "" ? null : (
							<div className={styles.error_styles}>{usernameError}</div>
						)}
						<TextField
							error={phoneError !== ""}
							autoComplete="tel"
							onFocus={() => handleWhatIsFocused("phone", true)}
							onBlur={() => handleWhatIsFocused("phone", false)}
							sx={textFieldStyles}
							placeholder="Phone Number"
							value={phone}
							onChange={setPhone}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<LocalPhoneRounded
											sx={{
												color:
													phoneError !== ""
														? "error.main"
														: whatIsFocused.phone
														? "primary.main"
														: "action.disabled",
											}}
										/>
									</InputAdornment>
								),
							}}
						/>
						{phoneError === "" ? null : (
							<div className={styles.error_styles}>{phoneError}</div>
						)}
						<TextField
							error={emailError !== ""}
							autoComplete="email"
							onFocus={() => handleWhatIsFocused("email", true)}
							onBlur={() => handleWhatIsFocused("email", false)}
							sx={textFieldStyles}
							placeholder="Email"
							value={email}
							onChange={setEmail}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<EmailRounded
											sx={{
												color:
													emailError !== ""
														? "error.main"
														: whatIsFocused.email
														? "primary.main"
														: "action.disabled",
											}}
										/>
									</InputAdornment>
								),
							}}
						/>
						{emailError === "" ? null : (
							<div className={styles.error_styles}>{emailError}</div>
						)}
						<TextField
							error={passwordError !== ""}
							autoComplete="new-password"
							onFocus={() => handleWhatIsFocused("password", true)}
							onBlur={() => handleWhatIsFocused("password", false)}
							sx={textFieldStyles}
							placeholder="Password"
							value={password}
							onChange={setPassword}
							type={isHidden ? "password" : "text"}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<IconButton
											sx={{
												marginRight: "-7.5px",
												color:
													passwordError !== ""
														? "error.main"
														: whatIsFocused.password
														? "primary.main"
														: "action.disabled",
											}}
											onClick={() => setIsHidden(!isHidden)}>
											{isHidden ? (
												<VisibilityOffRounded />
											) : (
												<VisibilityRounded />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						{passwordError === "" ? null : (
							<div className={styles.error_styles}>{passwordError}</div>
						)}
						<TextField
							error={confirmPasswordError !== ""}
							autoComplete="new-password"
							onFocus={() => handleWhatIsFocused("confirmPassword", true)}
							onBlur={() => handleWhatIsFocused("confirmPassword", false)}
							sx={textFieldStyles}
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={setConfirmPassword}
							type={isConfirmHidden ? "password" : "text"}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<IconButton
											sx={{
												marginRight: "-7.5px",
												color:
													confirmPasswordError !== ""
														? "error.main"
														: whatIsFocused.confirmPassword
														? "primary.main"
														: "action.disabled",
											}}
											onClick={() => setIsConfirmHidden(!isConfirmHidden)}>
											{isConfirmHidden ? (
												<VisibilityOffRounded />
											) : (
												<VisibilityRounded />
											)}
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						{confirmPasswordError === "" ? null : (
							<div className={styles.error_styles}>{confirmPasswordError}</div>
						)}
						<div className={styles.bottom_div}>
							<div className={styles.divider_div}>
								<Divider variant="middle" flexItem />
							</div>
							<div className={styles.bottom_buttons}>
								<Button
									onClick={handleExit}
									size="large"
									color="error"
									startIcon={<ClearRounded />}
									variant="outlined">
									cancel
								</Button>
								<Button
									size="large"
									color="success"
									startIcon={<CheckRounded />}
									variant="outlined"
									onClick={handleSignUp}>
									Sign Up
								</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}

export default CreateAccount;
