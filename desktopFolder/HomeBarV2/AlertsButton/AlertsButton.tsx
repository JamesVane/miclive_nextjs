/** @format */

import { useState } from "react";
import { Button, IconButton, Divider } from "@mui/material";
import {
	NotificationImportantRounded,
	CloseRounded,
	EmailRounded,
	PasswordRounded,
	CheckRounded,
} from "@mui/icons-material";
import { ClickAwayListener } from "@mui/base/ClickAwayListener";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

interface AlertsButtonProps {
	passwordIsSet: boolean;
	emailIsConfirmed: boolean;
	hasEmail: boolean;
}

function AlertsButton({
	passwordIsSet,
	emailIsConfirmed,
	hasEmail,
}: AlertsButtonProps) {
	const router = useRouter();
	const [isOpened, setIsOpened] = useState(false);

	function handleOpen() {
		setIsOpened(true);
	}

	function handleClose() {
		setIsOpened(false);
	}

	function handleAddEmail() {
		router.push("/change_email");
	}

	function handleVerifyEmail() {
		router.push("/confirm_email");
	}

	function handleSetPassword() {
		router.push("/set_password");
	}

	function calculateAlertsNumber() {
		let currentAlrtNumber = 0;
		if (!passwordIsSet) {
			currentAlrtNumber++;
		}
		if (!emailIsConfirmed || !hasEmail) {
			currentAlrtNumber++;
		}
		return currentAlrtNumber;
	}

	return (
		<>
			{isOpened ? (
				<ClickAwayListener onClickAway={handleClose}>
					<div
						className={styles.alerts_opened_main_div}
						style={{
							right: "80px",
						}}>
						<div className={styles.innter_div_alerts}>
							<IconButton
								onClick={handleClose}
								color="info"
								sx={{
									position: "absolute",
									top: "0px",
									right: "0px",
									height: "30px",
									width: "30px",
								}}>
								<CloseRounded
									sx={{
										height: "25px",
										width: "25px",
									}}
								/>
							</IconButton>
							<div className={styles.alert_open_title}>
								<NotificationImportantRounded
									sx={{
										height: "26px",
										width: "26px",
									}}
								/>
								Account Actions
							</div>
							<div className={styles.divider_div}>
								<Divider flexItem />
							</div>
							{hasEmail ? null : (
								<div className={styles.alert_action_row}>
									<Button
										onClick={handleAddEmail}
										sx={{
											marginLeft: "5px",
										}}
										size="small"
										startIcon={<EmailRounded />}
										color="info">
										Add and verify email
									</Button>
								</div>
							)}
							{!hasEmail || emailIsConfirmed ? null : (
								<div className={styles.alert_action_row}>
									<Button
										onClick={handleVerifyEmail}
										sx={{
											marginLeft: "5px",
										}}
										size="small"
										startIcon={<CheckRounded />}
										color="info">
										verify email
									</Button>
								</div>
							)}
							{passwordIsSet ? null : (
								<div className={styles.alert_action_row}>
									<Button
										onClick={handleSetPassword}
										sx={{
											marginLeft: "5px",
										}}
										size="small"
										startIcon={<PasswordRounded />}
										color="info">
										Create password
									</Button>
								</div>
							)}
						</div>
					</div>
				</ClickAwayListener>
			) : (
				<Button
					disabled={calculateAlertsNumber() === 0}
					onClick={handleOpen}
					sx={{
						height: "45px",

						fontSize: "25px",
						marginRight: "10px",
					}}
					size="large"
					color="info"
					variant="outlined"
					startIcon={
						<NotificationImportantRounded
							sx={{
								height: "30px",
								width: "30px",
							}}
						/>
					}>
					{calculateAlertsNumber()}
				</Button>
			)}
		</>
	);
}

export default AlertsButton;
