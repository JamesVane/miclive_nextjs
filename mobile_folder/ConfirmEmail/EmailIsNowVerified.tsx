/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Button, Box } from "@mui/material";
import { HomeRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Auth } from "aws-amplify";

interface EmailIsNowVerifiedProps {
	currentEmail: string;
}

function EmailIsNowVerified({ currentEmail }: EmailIsNowVerifiedProps) {
	const router = useRouter();

	async function handleGoHome() {
		try {
			const user = await Auth.currentAuthenticatedUser({ bypassCache: true });
			const userType = user.attributes["custom:RoleType"];
			router.push(`/m/${userType}`);
		} catch {
			router.push("/m/sign_in");
			return;
		}
	}

	return (
		<div className={styles.main_div}>
			<div
				className={styles.verified_page_text}
				style={{
					marginTop: "100px",
				}}>
				<Box
					sx={{
						color: "secondary.main",
					}}>
					Your account email
				</Box>
				<Box
					sx={{
						color: "primary.main",
						marginRight: "5px",
						marginLeft: "5px",
					}}>
					{currentEmail}
				</Box>
				<div className={styles.row_div}>
					<Box
						sx={{
							color: "secondary.main",
						}}>
						is
					</Box>
					<Box
						sx={{
							color: "success.main",
							marginLeft: "5px",
						}}>
						verified!
					</Box>
				</div>
			</div>
			<div className={styles.verified_page_sub_text}>
				you can now use your email to change your account phone number.
			</div>

			<Button
				onClick={handleGoHome}
				startIcon={<HomeRounded />}
				size="large"
				variant="outlined">
				go home
			</Button>
		</div>
	);
}

export default EmailIsNowVerified;
