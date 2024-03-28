/** @format */

import React from "react";
import { Box, Button } from "@mui/material";
import styles from "./styles.module.css";
import { HomeRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";

function InvalidQr() {
	const router = useRouter();

	function navigateHome() {
		router.push("/");
	}

	return (
		<Box className={styles.invalid_qr_main} color="warning.main">
			<div>Bad QR Code</div>
			<div>(It may be expired)</div>
			<Button
				onClick={navigateHome}
				size="large"
				sx={{ marginTop: "15px" }}
				startIcon={<HomeRounded />}
				variant="outlined">
				{" "}
				go to home page
			</Button>
		</Box>
	);
}

export default InvalidQr;
