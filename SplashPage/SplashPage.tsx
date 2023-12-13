/** @format */
"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./SplashPage.module.css";
import horizLogo from "../images/miclive_svg_horiz.svg";
import vertLogo from "../images/miclive_svg_vert.svg";
import { BrowserView, MobileView } from "react-device-detect";
import Image from "next/image";

const SplashPage = () => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
				width: "100%",
				backgroundColor: "#0f0f0fff",
			}}>
			<MobileView>
				<div className={styles.logo_vert}>
					<Image src={vertLogo} alt="logo" style={{ width: "85%" }} />
				</div>
			</MobileView>
			<BrowserView>
				<div className={styles.logo_div}>
					<Image src={horizLogo} alt="logo" style={{ width: "100%" }} />
				</div>
			</BrowserView>
			<Typography variant="subtitle1" component="div" gutterBottom>
				<span className={styles.dot}></span>
				<span className={styles.dot}></span>
				<span className={styles.dot}></span>
			</Typography>
		</Box>
	);
};

export default SplashPage;
