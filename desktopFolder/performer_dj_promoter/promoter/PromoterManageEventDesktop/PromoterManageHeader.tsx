/** @format */
"use client";

import React from "react";
import styles from "./styles.module.css";
import DividerH from "@/universalComponents/DividerH";
import { Button } from "@mui/material";
import {
	HomeRounded,
	CampaignRounded,
	AddCircleRounded,
	DoDisturbAltRounded,
} from "@mui/icons-material";
import Image from "next/image";
import horizLogo from "@/images/miclive_svg_horiz.svg";
import { useRouter } from "next/navigation";

interface PromoterManageHeaderProps {
	setAddPerformerModalOpen: () => void;
}

function PromoterManageHeader({
	setAddPerformerModalOpen,
}: PromoterManageHeaderProps) {
	const router = useRouter();

	function handleGoHome() {
		router.push("/promoter");
	}

	return (
		<>
			<div className={styles.header_div}>
				<Button
					onClick={handleGoHome}
					startIcon={<HomeRounded />}
					sx={{
						position: "absolute",
						left: "20px",
					}}
					color="secondary"
					variant="outlined">
					{" "}
					home
				</Button>
				<Button
					size="large"
					color="warning"
					startIcon={<CampaignRounded />}
					variant="outlined">
					make announcement
				</Button>
				<Button
					onClick={setAddPerformerModalOpen}
					size="large"
					startIcon={<AddCircleRounded />}
					sx={{
						marginRight: "10px",
						marginLeft: "10px",
					}}
					variant="outlined">
					add walkin performer
				</Button>
				<Button
					disabled={true}
					size="large"
					color="error"
					startIcon={<DoDisturbAltRounded />}
					variant="outlined">
					end ticket sales
				</Button>
				<div className={styles.mic_live}>
					<Image style={{ width: "85%" }} alt="logo" src={horizLogo} />
				</div>
			</div>
			<DividerH />
		</>
	);
}

export default PromoterManageHeader;
