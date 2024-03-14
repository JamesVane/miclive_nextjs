/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Button, Box, Divider } from "@mui/material";
import { CircleRounded, ArrowBackRounded } from "@mui/icons-material";
import Link from "next/link";

interface ChangePhoneNumberProps {
	accountPhoneNumber: string;
	currentEmailIsVerified: boolean;
	currentEmail: string;
	handleGoBack: () => void;
}

function ChangePhoneNumber({
	accountPhoneNumber,
	currentEmailIsVerified,
	currentEmail,
	handleGoBack,
}: ChangePhoneNumberProps) {
	const noEmailSet = currentEmail === "empty@empty.com";

	const emailLink = `mailto:support@mic.live?subject=Change Account Phone Number&body=Account Phone Number: ${accountPhoneNumber}, Account email: ${currentEmail}`;
	return (
		<div className={styles.main_div}>
			<div className={styles.to_change_phone_number}>
				<Box
					sx={{
						fontSize: "16px",
						marginLeft: "5px",
						color: "primary.main",
					}}>
					{accountPhoneNumber}
				</Box>
				To change your account phone number
				<div className={styles.divider_div}>
					<Divider flexItem />
				</div>
			</div>
			{currentEmailIsVerified ? null : (
				<div className={styles.instructions_row}>
					<CircleRounded
						color="primary"
						sx={{
							marginRight: "7px",
							height: "18px",
							width: "18px",
							marginTop: "3px",
						}}
					/>
					<Link href={noEmailSet ? "/change_email" : "m//confirm_email"}>
						{noEmailSet
							? "Add and verify an email address for your account"
							: "Verify your account email address"}
					</Link>
				</div>
			)}
			<div className={styles.instructions_row}>
				<CircleRounded
					color="primary"
					sx={{
						marginRight: "7px",
						height: "18px",
						width: "18px",
						marginTop: "3px",
					}}
				/>
				<div className={styles.column_helper}>
					<div className={styles.row_helper}>
						<div>
							{currentEmailIsVerified
								? "Click this link:"
								: "Then click this link:"}
						</div>
						<Box
							sx={{
								color: "primary.main",
								marginLeft: "6px",
								marginRight: "6px",
							}}>
							<a href={emailLink}>support@mic.live</a>
						</Box>
						<div>to</div>
					</div>
					<div className={styles.row_helper}>request a phone number change</div>
				</div>
			</div>
			<div className={styles.instructions_row}>
				<CircleRounded
					color="primary"
					sx={{
						marginRight: "7px",
						height: "18px",
						width: "18px",
						marginTop: "3px",
					}}
				/>
				<div className={styles.column_helper}>
					<div className={styles.row_helper}>
						<div>We will</div>
						<Box
							sx={{
								color: "primary.main",
								marginLeft: "6px",
								marginRight: "6px",
							}}>
							email
						</Box>
						<div>you a response with further</div>
					</div>
					<div className={styles.row_helper}>instructions within 12 hours</div>
				</div>
			</div>

			<Button onClick={handleGoBack} startIcon={<ArrowBackRounded />}>
				go back
			</Button>
		</div>
	);
}

export default ChangePhoneNumber;
