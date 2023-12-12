/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import { LoginRounded } from "@mui/icons-material";
interface PasswordResetSuccessPageProps {
	handleLogInRedirect: () => void;
}

function PasswordResetSuccessPage({
	handleLogInRedirect,
}: PasswordResetSuccessPageProps) {
	return (
		<div className={styles.success_page}>
			Password Reset Successful!
			<Button
				onClick={handleLogInRedirect}
				startIcon={<LoginRounded />}
				sx={{ marginTop: "10px" }}
				size="large"
				variant="outlined">
				log-in
			</Button>
		</div>
	);
}

export default PasswordResetSuccessPage;
