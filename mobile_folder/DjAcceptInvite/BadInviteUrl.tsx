/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import { ExitToAppRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";

function BadInviteUrl() {
	const router = useRouter();

	function handleGoToHome() {
		router.push("/");
	}

	return (
		<div className={styles.bad_url_main}>
			URL is not valid
			<div>(it may be expired)</div>
			<Button
				onClick={handleGoToHome}
				startIcon={<ExitToAppRounded sx={{ height: "25px", width: "25px" }} />}
				variant="outlined"
				sx={{ fontSize: "25px", marginTop: "10px" }}>
				go to home page
			</Button>
		</div>
	);
}

export default BadInviteUrl;
