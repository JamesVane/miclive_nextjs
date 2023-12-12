/** @format */

import React, { useState } from "react";
import styles from "./styles.module.css";
import { setForgotPasswordPhone } from "../../../store/forgotPasswordSlice";
import { TextField, InputAdornment, IconButton, Button } from "@mui/material";
import {
	LocalPhoneRounded,
	ClearRounded,
	ArrowBackIosNewRounded,
} from "@mui/icons-material";

interface ForgotPasswordPageProps {
	isSubmitting: boolean;
	forgotPasswordError: string;
	clearPhone: () => void;
	handleSetPhone: (phone: string) => void;
	phone: string;
	phoneIsValid: boolean;
	handleSendResetCode: () => void;
	handleExit: () => void;
}

function ForgotPasswordPage({
	isSubmitting,
	forgotPasswordError,
	clearPhone,
	handleSetPhone,
	phone,
	phoneIsValid,
	handleSendResetCode,
	handleExit,
}: ForgotPasswordPageProps) {
	const [whatIsFocused, setWhatIsFocused] = useState({
		password: false,
		phone: false,
	});

	function handleWhatIsFocused(key: string, value: boolean) {
		setWhatIsFocused({ ...whatIsFocused, [key]: value });
	}

	return (
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
				Reset Password
			</div>
			<TextField
				onFocus={() => handleWhatIsFocused("phone", true)}
				onBlur={() => handleWhatIsFocused("phone", false)}
				disabled={isSubmitting}
				error={forgotPasswordError !== ""}
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
										forgotPasswordError !== ""
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
											forgotPasswordError !== ""
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
			<div className={styles.error_div}>{forgotPasswordError}</div>
			<Button onClick={handleSendResetCode} disabled={!phoneIsValid}>
				send reset code
			</Button>
		</div>
	);
}

export default ForgotPasswordPage;
