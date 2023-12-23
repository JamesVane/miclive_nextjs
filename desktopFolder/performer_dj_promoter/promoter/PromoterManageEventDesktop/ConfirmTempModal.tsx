/** @format */
"use client";

import React, { useState, useCallback } from "react";
import styles from "./styles.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import DividerH from "@/universalComponents/DividerH";
import { MuiOtpInput } from "mui-one-time-password-input";
import {
	IconButton,
	Button,
	LinearProgress,
	Snackbar,
	Alert,
} from "@mui/material";
import { CloseRounded, ReplayRounded } from "@mui/icons-material";
import { postConfirmWalkinTempCode } from "@/api_functions/postConfirmWalkinTempCode";
import { postCreateAndReturnTempAccountCode } from "@/api_functions/postCreateAndReturnTempAccountCode";

interface ConfirmTempModalProps {
	baseEventId: number;
	phoneNumber: string;
}

function ConfirmTempModal({ baseEventId, phoneNumber }: ConfirmTempModalProps) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const usernameFromSearch = searchParams.get("username");

	const [phoneCode, setPhoneCode] = useState("");

	const [isLoading, setIsLoading] = useState(false);
	const [wrongCode, setWrongCode] = useState(false);
	const [codeResentSnack, setCodeResentSnack] = useState(false);

	function closeModal() {
		if (!isLoading) {
			router.push(`/promoter/manage_event/${baseEventId}`);
		}
	}

	const validateChar = (value: string) => {
		if (value.match(/^[0-9]+$/)) {
			return true;
		} else {
			return false;
		}
	};

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	async function handleConfirmation(phoneCode: string) {
		if (usernameFromSearch) {
			setIsLoading(true);
			const plusOnePhoneNumber = `+1${phoneNumber}`;
			await postConfirmWalkinTempCode({
				requestPhoneNumber: plusOnePhoneNumber,
				requestCode: phoneCode,
				requestUsername: usernameFromSearch,
				requestSpecificEventId: baseEventId.toString(),
			}).then((response) => {
				if (response.error) {
					setPhoneCode("");
					setWrongCode(true);
					setIsLoading(false);
				} else {
					router.push(
						`${pathname}/${response.uuid}` +
							"?" +
							createQueryString("performer_role_id", response.performerRoleId)
					);
				}
			});
		}
	}

	async function handleReSend() {
		if (usernameFromSearch) {
			setIsLoading(true);
			const plusOnePhoneNumber = `+1${phoneNumber}`;
			await postCreateAndReturnTempAccountCode(
				plusOnePhoneNumber,
				usernameFromSearch,
				usernameFromSearch === "EMPTY" ? false : true
			).then((res) => {
				if (res && res === "Code Created") {
					setPhoneCode("");
					setWrongCode(false);
					setCodeResentSnack(true);
				}
			});
			setIsLoading(false);
		}
	}

	const displayPhoneNumber = `(${phoneNumber[0]}${phoneNumber[1]}${phoneNumber[2]}) ${phoneNumber[3]}${phoneNumber[4]}${phoneNumber[5]}-${phoneNumber[6]}${phoneNumber[7]}${phoneNumber[8]}${phoneNumber[9]}`;

	const handleCloseresentSnack = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		setCodeResentSnack(false);
	};

	return (
		<div className={styles.modal_main_div}>
			<Snackbar
				open={codeResentSnack}
				autoHideDuration={6000}
				onClose={handleCloseresentSnack}>
				<Alert
					onClose={handleCloseresentSnack}
					severity="success"
					sx={{ width: "100%" }}>
					Code Resent.
				</Alert>
			</Snackbar>
			<div className={styles.modal_phone_confirm}>
				<div className={styles.add_performer_header}>
					Confirm Number
					<IconButton
						sx={{
							position: "absolute",
							right: "5px",
							top: "5px",
							height: "40px",
							width: "40px",
						}}
						onClick={closeModal}>
						<CloseRounded
							sx={{
								height: "35px",
								width: "35px",
							}}
						/>
					</IconButton>
				</div>
				<DividerH />
				<div className={styles.modal_below_header}>
					<div className={styles.confirm_phone_number_display}>
						{displayPhoneNumber}
					</div>
					<div className={styles.otp_container}>
						<MuiOtpInput
							TextFieldsProps={{
								disabled: isLoading,
								error: wrongCode,
							}}
							length={6}
							autoFocus
							value={phoneCode}
							onChange={(value) => {
								if (!isLoading) {
									if (wrongCode) {
										setWrongCode(false);
									}
									setPhoneCode(value);
								}
							}}
							validateChar={validateChar}
							onComplete={handleConfirmation}
						/>
					</div>
					<div className={styles.error_text}>
						{wrongCode ? "Incorrect code. Please try again" : ""}
					</div>
					<Button
						onClick={handleReSend}
						disabled={isLoading}
						sx={{ marginTop: "10px" }}
						size="large"
						startIcon={<ReplayRounded />}
						color="secondary">
						resend code
					</Button>

					{isLoading ? (
						<LinearProgress
							color="success"
							sx={{
								height: "5px",
								position: "absolute",
								bottom: "0px",
								width: "100%",
							}}
						/>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default ConfirmTempModal;
