/** @format */

import React from "react";
import { Button, Divider } from "@mui/material";
import styles from "./styles.module.css";
import { PersonAddAltRounded, LoginRounded } from "@mui/icons-material";

interface QrSignUpLogInCheckInProps {
	navigateToSignIn: () => void;
	navigateToCreateAccount: () => void;
	baseEventId: number;
	eventName: string;
	eventTagline: string;
}

function QrSignUpLogInCheckIn({
	navigateToSignIn,
	navigateToCreateAccount,
	baseEventId,
	eventName,
	eventTagline,
}: QrSignUpLogInCheckInProps) {
	return (
		<div className={styles.sign_up_in_main_div}>
			<div className={styles.mic_live}>MIC.LIVE</div>
			<div className={styles.divider_div}>
				<Divider flexItem />
			</div>
			<Button
				onClick={navigateToSignIn}
				startIcon={<LoginRounded />}
				sx={{
					height: "50px",
					width: "170px",
					fontSize: "25px",
					marginTop: "15px",
				}}
				variant="outlined">
				log-in
			</Button>
			Or
			<Button
				onClick={navigateToCreateAccount}
				startIcon={<PersonAddAltRounded />}
				sx={{
					height: "50px",
					width: "170px",
					fontSize: "25px",
					marginBottom: "10px",
				}}
				variant="outlined">
				sign-up
			</Button>
			<div className={styles.row_helper}>To Check-In to</div>
			<div className={styles.sign_up_event_display_div}>
				<div className={styles.sign_up_event_decoration}>
					<div className={styles.event_pic_div}>
						<div className={styles.event_pic_decoration}>
							<img
								src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${baseEventId}.jpg`}
								style={{
									width: "100%",
									height: "100%",
								}}
							/>
						</div>
					</div>
					<div className={styles.event_display_right}>
						<div className={styles.event_display_name}>{eventName}</div>
						<div className={styles.event_tagline}>{eventTagline}</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default QrSignUpLogInCheckIn;
