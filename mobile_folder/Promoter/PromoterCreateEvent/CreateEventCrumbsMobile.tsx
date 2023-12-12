/** @format */

import React from "react";
import styles from "./styles.module.css";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import Paper from "@mui/material/Paper";

function CreateEventCrumbsMobile() {
	const page = useSelector(
		(state: RootState) => state.promoterCreateEvent.page
	);

	function pageToStep(page: string) {
		switch (page) {
			case "baseEvent":
				return 0;
			case "specificEvent":
				return 1;
			case "specificEventDesc":
				return 2;
			case "DjInvite":
				return 3;
			default:
				return 0;
		}
	}

	return (
		<Paper square className={styles.crumbs_wrapper}>
			<MobileStepper
				sx={{
					width: "100%",
					backgroundColor: "transparent",
					justifyContent: "center",
				}}
				steps={3}
				activeStep={pageToStep(page)}
				position="static"
				nextButton={<Button sx={{ display: "none" }}></Button>}
				backButton={<Button sx={{ display: "none" }}></Button>}
			/>
		</Paper>
	);
}

export default CreateEventCrumbsMobile;
