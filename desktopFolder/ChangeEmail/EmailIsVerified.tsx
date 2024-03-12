/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Button, Box } from "@mui/material";
import { HomeRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Auth } from "aws-amplify";

interface EmailIsVerifiedProps {
	currentEmail: string;
	accountPhoneNumber: string;
}

function EmailIsVerified({
	currentEmail,
	accountPhoneNumber,
}: EmailIsVerifiedProps) {
	const router = useRouter();
	async function handleGoHome() {
		try {
			const currentUser = await Auth.currentAuthenticatedUser();
			const roleType = currentUser.attributes["custom:RoleType"];
			router.push(`/${roleType}`);
		} catch {
			router.push("/sign_in");
		}
	}

	const emailLink = `mailto:support@mic.live?subject=Change Account Email&body=Account Phone Number: ${accountPhoneNumber}, Account email: ${currentEmail}`;

	return (
		<div className={styles.main_div}>
			<div
				className={styles.already_verified_row}
				style={{
					marginBottom: "10px",
					fontWeight: "bold",
					fontSize: "23px",
				}}>
				<Box
					sx={{
						color: "secondary.main",
					}}>
					Your account email
				</Box>
				<Box
					sx={{
						marginRight: "5px",
						marginLeft: "5px",
						color: "primary.main",
					}}>
					{currentEmail}
				</Box>
				<Box
					sx={{
						color: "secondary.main",
					}}>
					is already verified
				</Box>
			</div>
			<div className={styles.already_verified_deco}>
				<div className={styles.to_change_email}>
					To change your account email:
				</div>
				<div className={styles.already_verified_row}>
					<Box
						sx={{
							color: "secondary.main",
						}}>
						click this link:
					</Box>
					<Box
						sx={{
							color: "primary.main",
							marginLeft: "5px",
							marginRight: "5px",
						}}>
						<a href={emailLink}>support@mic.live</a>
					</Box>
					<Box
						sx={{
							color: "secondary.main",
						}}>
						to send a pre-made email
					</Box>
				</div>
				<div className={styles.already_verified_row}>
					<Box>and we will get back to you within 12 hours</Box>
				</div>
			</div>

			<Button
				onClick={handleGoHome}
				sx={{
					marginTop: "20px",
				}}
				size="large"
				variant="contained"
				startIcon={<HomeRounded />}>
				go home
			</Button>
		</div>
	);
}

export default EmailIsVerified;
