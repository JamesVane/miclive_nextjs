/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import {
	TextField,
	Button,
	InputAdornment,
	IconButton,
	Snackbar,
	Alert,
	Paper,
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
import DividerH from "@/universalComponents/DividerH";

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
	clearUsername: () => void;
	clearPhone: () => void;
	clearEmail: () => void;
	clearPassword: () => void;
	clearConfirmPassword: () => void;
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
	clearUsername,
	clearPhone,
	clearEmail,
	clearPassword,
	clearConfirmPassword,
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
				<Paper className={styles.paper_container}>
					<div className={styles.header_div}>
						<Button
							size="large"
							startIcon={<ArrowBackIosNewRounded />}
							onClick={handleExit}
							color="secondary"
							sx={{ position: "absolute", left: "0", top: "0" }}>
							back
						</Button>
						{`Create ${accountType} Account`}
					</div>
					<DividerH />
					<form className={styles.body_div}>
						<TextField
							helperText={usernameError}
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
								startAdornment: (
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
								endAdornment: (
									<InputAdornment sx={{ width: "30px" }} position="end">
										<IconButton onClick={clearUsername}>
											<ClearRounded
												sx={{
													color:
														usernameError !== ""
															? "error.main"
															: whatIsFocused.username
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
							error={phoneError !== ""}
							helperText={phoneError}
							autoComplete="tel"
							onFocus={() => handleWhatIsFocused("phone", true)}
							onBlur={() => handleWhatIsFocused("phone", false)}
							sx={textFieldStyles}
							placeholder="Phone Number"
							value={phone}
							onChange={setPhone}
							InputProps={{
								startAdornment: (
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
								endAdornment: (
									<InputAdornment sx={{ width: "30px" }} position="end">
										<IconButton onClick={clearPhone}>
											<ClearRounded
												sx={{
													color:
														phoneError !== ""
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
							error={emailError !== ""}
							helperText={emailError}
							autoComplete="email"
							onFocus={() => handleWhatIsFocused("email", true)}
							onBlur={() => handleWhatIsFocused("email", false)}
							sx={textFieldStyles}
							placeholder="Email"
							value={email}
							onChange={setEmail}
							InputProps={{
								startAdornment: (
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
								endAdornment: (
									<InputAdornment sx={{ width: "30px" }} position="end">
										<IconButton onClick={clearEmail}>
											<ClearRounded
												sx={{
													color:
														emailError !== ""
															? "error.main"
															: whatIsFocused.email
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
							error={passwordError !== ""}
							helperText={passwordError}
							autoComplete="new-password"
							onFocus={() => handleWhatIsFocused("password", true)}
							onBlur={() => handleWhatIsFocused("password", false)}
							sx={textFieldStyles}
							placeholder="Password"
							value={password}
							onChange={setPassword}
							type={isHidden ? "password" : "text"}
							InputProps={{
								startAdornment: (
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
								endAdornment: (
									<InputAdornment sx={{ width: "30px" }} position="end">
										<IconButton onClick={clearPassword}>
											<ClearRounded
												sx={{
													color:
														passwordError !== ""
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
						<TextField
							error={confirmPasswordError !== ""}
							helperText={confirmPasswordError}
							autoComplete="new-password"
							onFocus={() => handleWhatIsFocused("confirmPassword", true)}
							onBlur={() => handleWhatIsFocused("confirmPassword", false)}
							sx={textFieldStyles}
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={setConfirmPassword}
							type={isConfirmHidden ? "password" : "text"}
							InputProps={{
								startAdornment: (
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
								endAdornment: (
									<InputAdornment sx={{ width: "30px" }} position="end">
										<IconButton onClick={clearConfirmPassword}>
											<ClearRounded
												sx={{
													color:
														confirmPasswordError !== ""
															? "error.main"
															: whatIsFocused.confirmPassword
															? "primary.main"
															: "action.disabled",
												}}
											/>
										</IconButton>
									</InputAdornment>
								),
							}}
						/>
						<div className={styles.bottom_div}>
							<DividerH />
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
				</Paper>
			</div>
		</>
	);
}

export default CreateAccount;
