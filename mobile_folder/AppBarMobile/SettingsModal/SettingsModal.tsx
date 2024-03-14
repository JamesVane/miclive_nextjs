/** @format */

import React from "react";
import styles from "./styles.module.css";
import { IconButton, Button, Divider, Box } from "@mui/material";
import {
	CloseRounded,
	LogoutRounded,
	MailRounded,
	MarkEmailReadRounded,
	PriorityHighRounded,
	ChangeCircleRounded,
	EmailRounded,
	LocalPhoneRounded,
	PasswordRounded,
} from "@mui/icons-material";

interface SettingsModalProps {
	closeModal: () => void;
	prettyPhoneNumber: string;
	accountHasemailSet: boolean;
	currentEmail: string;
	currentEmailIsVerified: boolean;
	handleLogOut: () => void;
	handleChangeEmail: () => void;
	handleChangePhone: () => void;
	handleChangePassword: () => void;
	handleVerifyEmail: () => void;
	handleSetPassword: () => void;
	passwordIsSet: boolean;
}

function SettingsModal({
	prettyPhoneNumber,
	accountHasemailSet,
	currentEmail,
	currentEmailIsVerified,
	closeModal,
	handleLogOut,
	handleChangeEmail,
	handleChangePhone,
	handleChangePassword,
	handleVerifyEmail,
	passwordIsSet,
	handleSetPassword,
}: SettingsModalProps) {
	return (
		<>
			<div className={styles.settings_header}>
				<IconButton
					color="secondary"
					sx={{
						position: "absolute",
						right: "0px",
					}}>
					<CloseRounded onClick={closeModal} />
				</IconButton>
				Account info & settings
			</div>

			<div className={styles.divider_horiz}>
				<Divider variant="middle" flexItem />
			</div>
			<div className={styles.settings_row}>
				<div className={styles.setgings_row_left}>
					<LocalPhoneRounded
						sx={{ marginRight: "5px", height: "20px", width: "20px" }}
					/>{" "}
					Acc. Phone #
				</div>
				<div className={styles.settings_row_right}>
					<div className={styles.divider_vert}>
						<Divider orientation="vertical" variant="middle" flexItem />
					</div>
					{prettyPhoneNumber}
				</div>
			</div>
			<div className={styles.settings_row}>
				{accountHasemailSet ? (
					<>
						<div className={styles.setgings_row_left}>
							<EmailRounded
								sx={{ marginRight: "5px", height: "20px", width: "20px" }}
							/>{" "}
							Acc. email
						</div>
						<div className={styles.settings_row_right}>
							<div className={styles.divider_vert}>
								<Divider orientation="vertical" variant="middle" flexItem />
							</div>
							{currentEmail}
						</div>
					</>
				) : (
					<Button
						onClick={handleChangeEmail}
						startIcon={<PriorityHighRounded />}
						endIcon={<MailRounded />}
						color="warning">
						set account email
					</Button>
				)}
			</div>
			{accountHasemailSet ? (
				<Box
					className={styles.settings_row}
					sx={{
						color: "success.main",
					}}>
					{currentEmailIsVerified ? (
						<>
							Account email verified <MarkEmailReadRounded />
						</>
					) : (
						<Button
							onClick={handleVerifyEmail}
							startIcon={<PriorityHighRounded />}
							endIcon={<EmailRounded />}
							color="warning">
							verify account email
						</Button>
					)}
				</Box>
			) : null}
			{accountHasemailSet ? (
				<div className={styles.settings_row}>
					<Button
						startIcon={<ChangeCircleRounded />}
						endIcon={<EmailRounded />}
						onClick={handleChangeEmail}>
						change account email
					</Button>
				</div>
			) : null}
			<div className={styles.settings_row}>
				<Button
					startIcon={<ChangeCircleRounded />}
					endIcon={<LocalPhoneRounded />}
					onClick={handleChangePhone}>
					change account phone number
				</Button>
			</div>
			<div className={styles.settings_row}>
				{passwordIsSet ? (
					<Button
						startIcon={<ChangeCircleRounded />}
						endIcon={<PasswordRounded />}
						onClick={handleChangePassword}>
						change account password
					</Button>
				) : (
					<Button
						color="warning"
						startIcon={<PriorityHighRounded />}
						endIcon={<PasswordRounded />}
						onClick={handleSetPassword}>
						set account password
					</Button>
				)}
			</div>
			<div
				className={styles.settings_row}
				style={{
					marginTop: "20px",
				}}>
				<Button
					size="large"
					variant="outlined"
					onClick={handleLogOut}
					startIcon={<LogoutRounded />}>
					Log-Out
				</Button>
			</div>
		</>
	);
}

export default SettingsModal;
