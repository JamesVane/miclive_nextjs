/** @format */

import React from "react";
import { Snackbar, Alert } from "@mui/material";

interface EditSnacksDesktopProps {
	setEditedBaseMessage: React.Dispatch<React.SetStateAction<boolean>>;
	editedBaseMessage: boolean;
	setEditedSpecificMessage: React.Dispatch<React.SetStateAction<boolean>>;
	editedSpecificMessage: boolean;
	setEditedDescriptionMessage: React.Dispatch<React.SetStateAction<boolean>>;
	editedDescriptionMessage: boolean;
}

function EditSnacksDesktop({
	setEditedBaseMessage,
	editedBaseMessage,
	setEditedSpecificMessage,
	editedSpecificMessage,
	setEditedDescriptionMessage,
	editedDescriptionMessage,
}: EditSnacksDesktopProps) {
	return (
		<>
			<Snackbar
				open={editedBaseMessage}
				autoHideDuration={6000}
				onClose={() => setEditedBaseMessage(false)}>
				<Alert
					onClose={() => setEditedBaseMessage(false)}
					severity="success"
					sx={{ width: "100%" }}>
					Updated Base Event!
				</Alert>
			</Snackbar>
			<Snackbar
				open={editedSpecificMessage}
				autoHideDuration={6000}
				onClose={() => setEditedSpecificMessage(false)}>
				<Alert
					onClose={() => setEditedSpecificMessage(false)}
					severity="success"
					sx={{ width: "100%" }}>
					Updated Specific Event!
				</Alert>
			</Snackbar>
			<Snackbar
				open={editedDescriptionMessage}
				autoHideDuration={6000}
				onClose={() => setEditedDescriptionMessage(false)}>
				<Alert
					onClose={() => setEditedDescriptionMessage(false)}
					severity="success"
					sx={{ width: "100%" }}>
					Updated Event Description!
				</Alert>
			</Snackbar>
		</>
	);
}

export default EditSnacksDesktop;
