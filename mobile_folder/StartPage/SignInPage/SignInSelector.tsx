/** @format */

import React from "react";
import { Button, Divider } from "@mui/material";
import {
	ArrowBackIosNewRounded,
	PasswordRounded,
	NumbersRounded,
} from "@mui/icons-material";
import styles from "./styles.module.css";

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
		<div className={styles.selector_div}>
			<div className={styles.header_div}>
				<Button
					onClick={handleExit}
					startIcon={<ArrowBackIosNewRounded />}
					color="secondary"
					size="large"
					sx={{ position: "absolute", top: "0px", left: "0px" }}>
					back
				</Button>
				Sign-In Method
			</div>

			<Button
				startIcon={
					<PasswordRounded
						sx={{
							height: "40px",
							width: "40px",
						}}
					/>
				}
				sx={{
					marginTop: "50px",
					marginBottom: "10px",
					width: "90%",
					height: "80px",
					fontSize: "18px",
				}}
				variant="contained"
				size="large"
				onClick={passwordLogin}>
				sign in with your password
			</Button>
			<div className={styles.selector_divider}>
				<Divider variant="middle" flexItem />
			</div>

			<Button
				startIcon={
					<NumbersRounded
						sx={{
							height: "40px",
							width: "40px",
						}}
					/>
				}
				sx={{
					marginTop: "10px",
					width: "90%",
					height: "80px",
					fontSize: "18px",
				}}
				variant="contained"
				size="large"
				onClick={codeLogin}>
				Sign-in with a text message code
			</Button>
		</div>
	);
}

export default SignInSelector;
