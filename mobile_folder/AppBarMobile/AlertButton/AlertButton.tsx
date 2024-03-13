/** @format */

import React from "react";
import { Button } from "@mui/material";
import { NotificationImportantRounded } from "@mui/icons-material";

interface AlertButtonProps {
	passwordIsSet: boolean;
	emailIsConfirmed: boolean;
	hasEmail: boolean;
	handleOpenModal: () => void;
}

function AlertButton({
	passwordIsSet,
	emailIsConfirmed,
	hasEmail,
	handleOpenModal,
}: AlertButtonProps) {
	function calculateAlertsNumber() {
		let currentAlrtNumber = 0;
		if (!passwordIsSet) {
			currentAlrtNumber++;
		}
		if (!emailIsConfirmed || !hasEmail) {
			currentAlrtNumber++;
		}
		return currentAlrtNumber;
	}

	return (
		<Button
			disabled={calculateAlertsNumber() === 0}
			variant="outlined"
			size="small"
			startIcon={<NotificationImportantRounded />}
			onClick={handleOpenModal}
			color="info">
			{calculateAlertsNumber()}
		</Button>
	);
}

export default AlertButton;
