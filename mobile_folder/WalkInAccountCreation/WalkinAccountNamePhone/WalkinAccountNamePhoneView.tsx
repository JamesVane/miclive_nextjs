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
	VisibilityRounded,
	AccountBoxRounded,
	VisibilityOffRounded,
	CheckRounded,
	ClearRounded,
} from "@mui/icons-material";

interface CreateAccountProps {
	phone: string;
	username: string;
	usernameError: string;
	phoneError: string;
	handleSignUp: () => void;
	setUsername: (e: React.ChangeEvent<HTMLInputElement>) => void;
	setPhone: (e: React.ChangeEvent<HTMLInputElement>) => void;
	snackMessage: string;
	setSnackMessage: React.Dispatch<React.SetStateAction<string>>;
	handleExit: () => void;
}

function WalkinAccountNamePhoneView({
	phone,
	username,
	usernameError,
	phoneError,
	handleSignUp,
	setUsername,
	setPhone,
	snackMessage,
	setSnackMessage,
	handleExit,
}: CreateAccountProps) {
	const [whatIsFocused, setWhatIsFocused] = useState({
		username: false,
		phone: false,
	});
	const [isHidden, setIsHidden] = useState(true);

	function handleWhatIsFocused(key: string, value: boolean) {
		setWhatIsFocused({ ...whatIsFocused, [key]: value });
	}

	const textFieldStyles = {
		width: "90%",
		margin: "10px",
		marginBottom: "20px",
	};

	const signUpDisabled =
		phone === "" ||
		username === "" ||
		phoneError !== "" ||
		usernameError !== "";

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
				<div className={styles.header_div}>{`Create performer account`}</div>
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
									disabled={signUpDisabled}
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

export default WalkinAccountNamePhoneView;
