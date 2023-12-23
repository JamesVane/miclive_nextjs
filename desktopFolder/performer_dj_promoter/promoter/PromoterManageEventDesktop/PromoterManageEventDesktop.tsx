/** @format */
"use client";

import React, { useState } from "react";
import styles from "./styles.module.css";
import PromoterManageHeader from "./PromoterManageHeader";
import NotCheckedInHelper from "./NotCheckedInHelper";
import InQueueHelper from "./InQueueHelper";
import AlreadyPerformedHelper from "./AlreadyPerformedHelper";
import { usePathname, useRouter } from "next/navigation";

function PromoterManageEventDesktop() {
	const router = useRouter();
	const pathname = usePathname();

	function handleOpenModal() {
		router.push(`${pathname}/adding_performer`);
	}

	return (
		<>
			<div className={styles.main_div}>
				<PromoterManageHeader setAddPerformerModalOpen={handleOpenModal} />
				<div className={styles.bottom_div}>
					<div className={styles.roster_third_splitter}>
						<div className={styles.roser_head}>Not Checked In</div>
						<div className={styles.yellow_bar_thing} />
						<NotCheckedInHelper />
					</div>
					<div className={styles.roster_third_splitter}>
						<div className={styles.roser_head}>In Queue</div>
						<div className={styles.yellow_bar_thing} />
						<InQueueHelper />
					</div>
					<div className={styles.roster_third_splitter}>
						<div className={styles.roser_head}>Has Performed</div>
						<div className={styles.yellow_bar_thing} />
						<AlreadyPerformedHelper />
					</div>
				</div>
			</div>
		</>
	);
}

export default PromoterManageEventDesktop;
