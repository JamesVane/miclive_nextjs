/** @format */

import React from "react";
import { Button } from "@mui/material";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

function WalkInLocation() {
	const router = useRouter();

	return (
		<div className={styles.location_main}>
			<Button
				onClick={() => router.push("/m")}
				size="small"
				color="secondary"
				sx={{ position: "absolute", left: "0px", top: "0px" }}
				startIcon={<ArrowBackIosNewRounded />}>
				back
			</Button>
			Coming Soon...
		</div>
	);
}

export default WalkInLocation;
