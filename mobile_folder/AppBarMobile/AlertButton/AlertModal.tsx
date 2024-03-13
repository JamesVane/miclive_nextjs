/** @format */

import { useState, useEffect } from "react";
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
import { Auth } from "aws-amplify";
import { Triangle } from "react-loader-spinner";

interface AlertModalProps {
	handleClose: () => void;
}

function AlertModal({ handleClose }: AlertModalProps) {
	const router = useRouter();

	const [hasEmail, setHasEmail] = useState(false);
	const [emailIsConfirmed, setEmailIsConfirmed] = useState(false);
	const [passwordIsSet, setPasswordIsSet] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		async function initAlertButton() {
			try {
				const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
			} catch {
				router.push("/sign_in");
				return;
			}
			const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
			const currrentEmail = user.attributes.email;
			if (currrentEmail && currrentEmail !== "empty@empty.com") {
				setHasEmail(true);
			}
			const emailIsVerified = user.attributes.email_verified;
			if (emailIsVerified) {
				setEmailIsConfirmed(true);
			}
			try {
				const isPasswordSet = user.attributes["custom:hasPasswordSet"];
				if (isPasswordSet && isPasswordSet === "true") {
					setPasswordIsSet(true);
				}
			} catch {
				await Auth.updateUserAttributes(user, {
					"custom:hasPasswordSet": "false",
				});
			}
			setIsLoading(false);
		}
		initAlertButton();
	}, []);

	function handleAddEmail() {
		router.push("/m/change_email");
	}

	function handleVerifyEmail() {
		router.push("/m/confirm_email");
	}

	function handleSetPassword() {
		router.push("/m/set_password");
	}

	return (
		<div className={styles.alert_overlay_modal} onClick={handleClose}>
			<div
				className={styles.alert_paper}
				onClick={(e) => {
					e.stopPropagation();
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
								marginLeft: "5px",
								marginRight: "5px",
							}}
						/>
						Account Actions
					</div>
					<div className={styles.divider_div}>
						<Divider flexItem />
					</div>
					{isLoading ? (
						<div className={styles.loading_div}>
							<Triangle color="#1f37c2" />
						</div>
					) : (
						<>
							{hasEmail ? null : (
								<div className={styles.alert_action_row}>
									<Button
										onClick={handleAddEmail}
										size="large"
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
										size="large"
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
										size="large"
										startIcon={<PasswordRounded />}
										color="info">
										Create password
									</Button>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default AlertModal;
