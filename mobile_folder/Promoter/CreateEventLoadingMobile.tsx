/** @format */

import { CircularProgress } from "@mui/material";
import React from "react";

function CreateEventLoadingMobile() {
	return (
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				position: "absolute",
				zIndex: "6000",
			}}>
			MIC.LIVE
			<CircularProgress />
		</div>
	);
}

export default CreateEventLoadingMobile;
