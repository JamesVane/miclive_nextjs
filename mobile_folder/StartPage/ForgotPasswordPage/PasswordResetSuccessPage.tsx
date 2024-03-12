/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import { LoginRounded, HomeRounded } from "@mui/icons-material";
interface PasswordResetSuccessPageProps {
	handleLogInRedirect: () => void;
	settingFromNoPassword?: boolean;
}

function PasswordResetSuccessPage({
	handleLogInRedirect,
	settingFromNoPassword,
}: PasswordResetSuccessPageProps) {
	return (
		<div className={styles.success_page}>
			{settingFromNoPassword
				? "Password set successfully!"
				: "Password reset successful!"}
			<Button
				onClick={handleLogInRedirect}
				startIcon={settingFromNoPassword ? <HomeRounded /> : <LoginRounded />}
				sx={{ marginTop: "10px" }}
				size="large"
				variant="outlined">
				{settingFromNoPassword ? "go home" : "continue"}
			</Button>
		</div>
	);
}

export default PasswordResetSuccessPage;
