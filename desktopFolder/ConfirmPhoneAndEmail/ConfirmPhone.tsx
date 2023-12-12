/** @format */

import React from "react";
import {
	Button,
	Divider,
	Snackbar,
	Alert,
	Paper,
	CircularProgress,
} from "@mui/material";
import styles from "./styles.module.css";
import { MuiOtpInput } from "mui-one-time-password-input";
import { RefreshRounded } from "@mui/icons-material";

interface ConfirmPhoneProps {
	handleConfirmation: (phoneCode: string) => void;
	validateChar: (value: string) => boolean;
	message: string;
	setMessage: React.Dispatch<React.SetStateAction<string>>;
	handleResendCode: () => void;
	setPhoneCode: React.Dispatch<React.SetStateAction<string>>;
	phoneCode: string;
	isLoading: boolean;
}

function ConfirmPhone({
	handleConfirmation,
	validateChar,
	message,
	setMessage,
	handleResendCode,
	setPhoneCode,
	phoneCode,
	isLoading,
}: ConfirmPhoneProps) {
	return (
		<>
			<Snackbar
				open={message !== ""}
				autoHideDuration={6000}
				onClose={() => setMessage("")}>
				<Alert
					sx={{
						display: message === "" ? "none" : "flex",
					}}
					severity={
						message === "Confirmation code resent successfully!"
							? "success"
							: "error"
					}>
					{message}
				</Alert>
			</Snackbar>
			<div className={styles.main_div}>
				<Paper className={styles.paper_container}>
					{isLoading ? (
						<div className={styles.loading_div}>
							<CircularProgress
								size={100}
								sx={{ marginBottom: "20px" }}
								color="primary"
							/>
							Loading...
						</div>
					) : null}
					<div className={styles.title_div}>Confirm Phone Number</div>
					<div className={styles.confirm_input_div}>
						<MuiOtpInput
							length={6}
							autoFocus
							value={phoneCode}
							onChange={(value) => setPhoneCode(value)}
							validateChar={validateChar}
							onComplete={handleConfirmation}
						/>
					</div>
					<Button
						onClick={handleResendCode}
						color="secondary"
						sx={{ marginTop: "10px" }}
						startIcon={<RefreshRounded />}
						size="large">
						Re-send code
					</Button>
				</Paper>
			</div>
		</>
	);
}

export default ConfirmPhone;
