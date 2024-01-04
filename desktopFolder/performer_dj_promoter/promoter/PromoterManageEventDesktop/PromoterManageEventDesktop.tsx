/** @format */
"use client";

import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import PromoterManageHeader from "./PromoterManageHeader";
import NotCheckedInHelper from "./NotCheckedInHelper";
import InQueueHelper from "./InQueueHelper";
import AlreadyPerformedHelper from "./AlreadyPerformedHelper";
import { usePathname, useRouter } from "next/navigation";
import { promoterGetQrAndKeyFromDynamo } from "@/api_functions/promoterGetQrAndKeyFromDynamo";
import { getPromoterManageCurrentEventData } from "@/api_functions/getPromoterManageCurrentEventData";
import { useDispatch } from "react-redux";
import SplashPage from "@/SplashPage";
import { setPromoterManageState } from "@/store/PromoterManageEventState";

interface PromoterManageEventDesktopProps {
	specificEventId: string;
}

function PromoterManageEventDesktop({
	specificEventId,
}: PromoterManageEventDesktopProps) {
	const dispatch = useDispatch();
	const router = useRouter();
	const pathname = usePathname();

	const [isLoading, setIsLoading] = useState(true);
	const [checkinUuidAndId, setCheckinUuidAndQr] = useState<{
		uuid: string;
		key: string;
	} | null>(null);

	function handleOpenModal() {
		router.push(`${pathname}/adding_performer`);
	}

	async function handleQrAndId() {
		promoterGetQrAndKeyFromDynamo(specificEventId).then((res) => {
			setCheckinUuidAndQr({
				uuid: res.qr_code_uuid,
				key: res.check_in_id,
			});
		});
	}

	useEffect(() => {
		if (isLoading) {
			handleQrAndId().then(() => {
				getPromoterManageCurrentEventData(specificEventId!).then((data) => {
					dispatch(setPromoterManageState(data));
					setIsLoading(false);
				});
			});
		}
	}, []);

	return (
		<>
			{isLoading ? (
				<SplashPage />
			) : (
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
			)}
		</>
	);
}

export default PromoterManageEventDesktop;
