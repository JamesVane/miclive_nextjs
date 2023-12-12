/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import { ArrowBackIosNewRounded } from "@mui/icons-material";

interface LocationCheckInProps {
	handleToStart: () => void;
}

function LocationCheckIn({ handleToStart }: LocationCheckInProps) {
	return (
		<>
			<Button
				onClick={handleToStart}
				size="small"
				sx={{ position: "absolute", left: "2px", top: "2px" }}
				startIcon={<ArrowBackIosNewRounded />}
				color="secondary">
				back
			</Button>
			Coming Soon...
		</>
	);
}

export default LocationCheckIn;
