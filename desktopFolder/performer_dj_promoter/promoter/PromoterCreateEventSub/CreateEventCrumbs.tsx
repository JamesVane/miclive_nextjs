/** @format */

import React from "react";
import styles from "./styles.module.css";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";

function CreateEventCrumbs() {
	const page = useSelector(
		(state: RootState) => state.promoterCreateEvent.page
	);

	function pageToStep(page: string) {
		switch (page) {
			case "baseEvent":
				return 0;
			case "Banner":
				return 1;
			case "baseEventDescription":
				return 2;
			case "specificEvent":
				return 3;
			case "specificEventDesc":
				return 4;
			case "DjInvite":
				return 4;
			default:
				return 0;
		}
	}

	return (
		<div className={styles.crumbs_wrapper}>
			{page === "DjInvite" ? null : (
				<MobileStepper
					sx={{
						width: "100%",
						backgroundColor: "transparent",
						justifyContent: "center",
					}}
					steps={5}
					activeStep={pageToStep(page)}
					position="static"
					nextButton={<Button sx={{ display: "none" }}></Button>}
					backButton={<Button sx={{ display: "none" }}></Button>}
				/>
			)}
		</div>
	);
}

export default CreateEventCrumbs;
