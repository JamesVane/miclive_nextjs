/** @format */

import React from "react";
import styles from "./styles.module.css";
import { EmailRounded } from "@mui/icons-material";

function EmailWidget() {
	return (
		<div className={styles.email_widget_inner}>
			<EmailRounded
				sx={{
					marginRight: "5px",
				}}
			/>
			emailAddress@gmail.com
		</div>
	);
}

export default EmailWidget;
