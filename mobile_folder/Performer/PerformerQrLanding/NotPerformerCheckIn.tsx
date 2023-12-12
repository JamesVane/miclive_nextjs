/** @format */

import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";
import { Button, Divider } from "@mui/material";
import { LogoutRounded, HomeRounded } from "@mui/icons-material";

interface NotPerformerCheckInProps {
	accountType: "promoter" | "dj";
}

function NotPerformerCheckIn({ accountType }: NotPerformerCheckInProps) {
	const router = useRouter();

	function handleGoHome() {
		router.push(`/m/${accountType}`);
	}
	function capitalizeFirstLetter(input: string): string {
		if (!input || input.length === 0) {
			return input;
		}
		return input.charAt(0).toUpperCase() + input.slice(1);
	}

	function handleLogOut() {
		localStorage.clear();
		sessionStorage.clear();
		window.location.reload();
	}

	return (
		<div className={styles.wrong_page}>
			You are currently logged{" "}
			<div className={styles.row_helper}>
				in as a
				<div className={styles.primary_helper}>{`${capitalizeFirstLetter(
					accountType
				)}.`}</div>
			</div>
			<div className={styles.divider_div} style={{ width: "420px" }}>
				<Divider flexItem />
			</div>
			<div className={styles.row_helper}>
				<Button
					onClick={handleLogOut}
					sx={{
						fontSize: "18px",
						marginTop: "15px",
						marginRight: "10px",
						marginBottom: "15px",
					}}
					startIcon={<LogoutRounded />}
					variant="outlined">
					log-out
				</Button>
				<div className={styles.column_helper}>
					<div className={styles.smaller_text}>And use a Performer</div>
					<div className={styles.smaller_text}>account to</div>
					<div className={styles.smaller_text}>Sign-Up/Check-In</div>
				</div>
			</div>
			<div className={styles.divider_div} style={{ width: "420px" }}>
				<Divider flexItem />
			</div>
			<div>Or</div>
			<Button
				onClick={handleGoHome}
				sx={{ fontSize: "18px" }}
				startIcon={<HomeRounded />}
				variant="outlined">
				go to account home
			</Button>
		</div>
	);
}

export default NotPerformerCheckIn;
