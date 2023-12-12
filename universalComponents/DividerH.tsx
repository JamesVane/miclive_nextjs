/** @format */

import React from "react";
import { Divider } from "@mui/material";

function DividerH() {
	return (
		<div
			style={{
				width: "100%",
				height: "2px",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
			}}>
			<Divider variant="middle" flexItem />
		</div>
	);
}

export default DividerH;
