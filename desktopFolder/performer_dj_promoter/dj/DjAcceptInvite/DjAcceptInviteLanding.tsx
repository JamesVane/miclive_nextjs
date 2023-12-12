/** @format */

import React from "react";
import { Button } from "@mui/material";
import { PersonAddAltRounded, LoginRounded } from "@mui/icons-material";
import styles from "./styles.module.css";
import DividerH from "@/universalComponents/DividerH";

interface DjAcceptInviteLandingProps {
	navigateToSignIn: () => void;
	navigateToCreateAccount: () => void;
}

function DjAcceptInviteLanding({
	navigateToSignIn,
	navigateToCreateAccount,
}: DjAcceptInviteLandingProps) {
	return (
		<div className={styles.main_div}>
			<div className={styles.mic_live}>MIC.LIVE</div>
			<div className={styles.divider_div}>
				<DividerH />
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
			<div className={styles.row_helper}>
				To accept <div className={styles.primary_helper}>DJ</div> invitation
			</div>
		</div>
	);
}

export default DjAcceptInviteLanding;
