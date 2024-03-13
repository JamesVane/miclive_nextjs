/** @format */

import React from "react";
import { IconButton, Button } from "@mui/material";
import {
	CloseRounded,
	ArrowBackIosRounded,
	CheckRounded,
} from "@mui/icons-material";
import styles from "./styles.module.css";
import PreviousRosterHelper from "./PreviousRosterHelper";
import { DateRoster } from "./dateModalReducer";

interface PreviousEventRosterProps {
	handleClose: () => void;
	handleCloseModal: () => void;
	prevRoster: DateRoster;
}

function PreviousEventRoster({
	handleClose,
	handleCloseModal,
	prevRoster,
}: PreviousEventRosterProps) {
	return (
		<>
			<div className={styles.upload_audio_header}>
				<IconButton
					color="secondary"
					onClick={handleCloseModal}
					sx={{
						height: "35px",
						width: "35px",
						marginRight: "5px",
						position: "absolute",
						right: "5px",
					}}>
					<CloseRounded sx={{ height: "35px", width: "35px" }} />
				</IconButton>
				<Button
					onClick={handleClose}
					startIcon={<ArrowBackIosRounded />}
					sx={{
						position: "absolute",
						left: "5px",
					}}
					color="secondary">
					back
				</Button>
			</div>
			<div className={styles.roster_scroll}>
				<PreviousRosterHelper previousRosterArray={prevRoster} />
			</div>
		</>
	);
}

export default PreviousEventRoster;
