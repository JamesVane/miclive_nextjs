/** @format */
"use client";

import React from "react";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import PromoterCreateEventContainer from "./PromoterCreateEventContainer";
import { useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";

function PromoterCreateEvent() {
	const router = useRouter();

	const EventData = useSelector(
		(state: RootState) => state.promoterCreateEvent
	);
	const currentPage = EventData.page;

	return (
		<div className={styles.main_div}>
			<div className={styles.header_div}>
				{currentPage === "DjInvite" ? null : (
					<Button
						onClick={() => router.push("/m/promoter")}
						color="secondary"
						sx={{ position: "fixed", left: "0px", top: "0px", zIndex: 1500 }}
						startIcon={<ArrowBackIosNewRounded />}>
						back
					</Button>
				)}
			</div>
			<div className={styles.container_div}>
				<PromoterCreateEventContainer />
			</div>
		</div>
	);
}

export default PromoterCreateEvent;
