/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Button, LinearProgress, Box } from "@mui/material";
import {
	ArrowBackIosNewRounded,
	ChangeCircleRounded,
	RefreshRounded,
	ErrorOutlineRounded,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { MuiOtpInput } from "mui-one-time-password-input";
import { Triangle } from "react-loader-spinner";
import { error } from "console";

interface ConfirmEmailProps {
	setEmailConfirmCode: React.Dispatch<React.SetStateAction<string>>;
	emailConfirmCode: string;
	validateChar: (value: string) => boolean;
	handleConfirmation: (emailCode: string) => void;
	currentEmail: string;
	somehtingIsGoingOn: boolean;
	errorMessage: string;
	resendCodeLoading: boolean;
	handleResendCode: () => void;
	resendCodeSuccess: boolean;
}

function ConfirmEmail({
	setEmailConfirmCode,
	emailConfirmCode,
	validateChar,
	handleConfirmation,
	currentEmail,
	somehtingIsGoingOn,
	errorMessage,
	resendCodeLoading,
	handleResendCode,
	resendCodeSuccess,
}: ConfirmEmailProps) {
	const router = useRouter();

	function handleBack() {
		router.back();
	}

	function handleChangeEmail() {
		router.push("/m/change_email");
	}

	return (
		<div className={styles.main_div}>
			{somehtingIsGoingOn ? (
				<div className={styles.loading_div}>
					<Triangle color="#888661" height={140} width={140} />
				</div>
			) : null}
			<Button
				onClick={handleBack}
				size="small"
				startIcon={<ArrowBackIosNewRounded />}
				color="secondary"
				sx={{
					position: "absolute",
					left: "0px",
					top: "0px",
				}}>
				back
			</Button>
			<div className={styles.header_div}>Confirm Email Address</div>
			<div className={styles.instructions_div}>
				An email with a confirmation code was
			</div>

			<div className={styles.row_div}>
				<div className={styles.instructions_div}>sent to:</div>
				<div className={styles.current_email_div}>{currentEmail}</div>
			</div>

			<Button
				onClick={handleChangeEmail}
				startIcon={<ChangeCircleRounded />}
				size="small"
				color="secondary"
				sx={{
					marginBottom: "5px",
				}}>
				change email
			</Button>
			<div className={styles.confirm_input_div}>
				<MuiOtpInput
					TextFieldsProps={{
						error: errorMessage !== "",
					}}
					length={6}
					autoFocus
					value={emailConfirmCode}
					onChange={(value) => setEmailConfirmCode(value)}
					validateChar={validateChar}
					onComplete={handleConfirmation}
				/>
			</div>
			<Box
				sx={{
					color: "error.main",
				}}
				className={styles.error_div}>
				{errorMessage}
			</Box>
			<Button
				onClick={handleResendCode}
				sx={{
					position: "relative",
					overflow: "hidden",
				}}
				disabled={somehtingIsGoingOn || resendCodeLoading}
				color="secondary"
				size="large"
				startIcon={<RefreshRounded />}>
				re-send confirmation code
				{resendCodeLoading ? (
					<LinearProgress
						sx={{
							position: "absolute",
							bottom: "0px",
							width: "100%",
						}}
					/>
				) : null}
			</Button>
			{resendCodeSuccess ? (
				<Box
					className={styles.spam_notice}
					sx={{
						color: "warning.main",
					}}>
					<ErrorOutlineRounded sx={{ marginRight: "5px" }} />
					Check your spam/junk folder for the email
				</Box>
			) : null}
		</div>
	);
}

export default ConfirmEmail;
