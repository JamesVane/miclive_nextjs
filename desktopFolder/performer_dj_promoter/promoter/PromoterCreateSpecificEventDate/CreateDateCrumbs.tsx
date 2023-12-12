/** @format */

import React from "react";
import styles from "./styles.module.css";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";

function CreateDateCrumbs() {
	const page = useSelector((state: RootState) => state.promoterCreateDate.page);

	function pageToStep(page: string) {
		switch (page) {
			case "specificEvent":
				return 0;
			case "specificEventDesc":
				return 1;
			case "DjInvite":
				return 2;
		}
	}

	return (
		<div className={styles.crumbs_wrapper}>
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
		</div>
	);
}

export default CreateDateCrumbs;
