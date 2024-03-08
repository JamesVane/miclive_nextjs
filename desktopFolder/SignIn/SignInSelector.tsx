/** @format */

import React from "react";
import styles from "./styles.module.css";
import {
	Button,
	TextField,
	InputAdornment,
	IconButton,
	LinearProgress,
	Divider,
} from "@mui/material";
import {
	ClearRounded,
	LocalPhoneRounded,
	RemoveRedEyeRounded,
	VisibilityOffRounded,
	CheckRounded,
	HelpCenterRounded,
	ArrowBackIosNewRounded,
	PasswordRounded,
	NumbersRounded,
} from "@mui/icons-material";

interface SignInSelectorProps {
	handleExit: () => void;
	passwordLogin: () => void;
	codeLogin: () => void;
}

function SignInSelector({
	handleExit,
	passwordLogin,
	codeLogin,
}: SignInSelectorProps) {
	return (
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
			</div>
			<div className={styles.selector_text}>Sign-In with your</div>

			<Button
				startIcon={<PasswordRounded />}
				sx={{
					marginTop: "10px",
					marginBottom: "10px",
				}}
				variant="outlined"
				size="large"
				onClick={passwordLogin}>
				password
			</Button>
			<div className={styles.selector_text}>or a</div>

			<Button
				startIcon={<NumbersRounded />}
				sx={{
					marginTop: "10px",
				}}
				variant="outlined"
				size="large"
				onClick={codeLogin}>
				code texted to your phone
			</Button>
		</>
	);
}

export default SignInSelector;
