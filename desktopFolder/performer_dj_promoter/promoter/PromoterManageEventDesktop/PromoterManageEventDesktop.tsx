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
import { useDispatch, useSelector } from "react-redux";
import SplashPage from "@/SplashPage";
import { RootState } from "@/store/rootStore";
import { setPromoterManageState } from "@/store/PromoterManageEventState";
import ChangeAudioModal from "./ChangeAudioModal";
import PromoterMakeAnnouncementManagePage from "./PromoterMakeAnnouncementManagePage";
import { Snackbar, Alert } from "@mui/material";

interface PromoterManageEventDesktopProps {
	specificEventId: string;
}

function PromoterManageEventDesktop({
	specificEventId,
}: PromoterManageEventDesktopProps) {
	const dispatch = useDispatch();
	const router = useRouter();
	const pathname = usePathname();

	const shouldReFetchFromSocketSlice = useSelector(
		(state: RootState) => state.shouldReFetchFromSocketSlice
	);

	const [isLoading, setIsLoading] = useState(true);
	const [successfulAnnouncementSnack, setSuccessfulAnnouncementSnack] =
		useState(false);
	const [announcementModalOpen, setAnnouncementModalOpen] = useState(false);
	const [changeAudioModal, setChangeAudioModal] = useState({
		performerId: 0,
		performerName: "",
	});
	const [checkinUuidAndId, setCheckinUuidAndQr] = useState<{
		uuid: string;
		key: string;
	} | null>(null);

	function handleOpenModal() {
		router.push(`${pathname}/adding_performer`);
	}

	function openAnnouncementMdal() {
		setAnnouncementModalOpen(true);
	}

	async function handleQrAndId() {
		promoterGetQrAndKeyFromDynamo(specificEventId).then((res) => {
			setCheckinUuidAndQr({
				uuid: res.qr_code_uuid,
				key: res.check_in_id,
			});
		});
	}

	function handleClostChangeAudioModal() {
		setChangeAudioModal({
			performerId: 0,
			performerName: "",
		});
	}

	useEffect(() => {
		handleQrAndId().then(() => {
			getPromoterManageCurrentEventData(specificEventId!).then((data) => {
				dispatch(setPromoterManageState(data));
				setIsLoading(false);
			});
		});
	}, [shouldReFetchFromSocketSlice]);

	return (
		<>
			{isLoading ? (
				<SplashPage />
			) : (
				<>
					<Snackbar
						open={successfulAnnouncementSnack}
						autoHideDuration={6000}
						onClose={() => setSuccessfulAnnouncementSnack(false)}>
						<Alert severity="success">Announcement Sent.</Alert>
					</Snackbar>
					{changeAudioModal.performerName === "" ? null : (
						<ChangeAudioModal
							performerName={changeAudioModal.performerName}
							performerId={changeAudioModal.performerId}
							specificEventId={Number(specificEventId)}
							close={handleClostChangeAudioModal}
						/>
					)}
					{announcementModalOpen ? (
						<PromoterMakeAnnouncementManagePage
							successfulClose={() => {
								setSuccessfulAnnouncementSnack(true);
								setAnnouncementModalOpen(false);
							}}
							close={() => setAnnouncementModalOpen(false)}
						/>
					) : null}
					<div className={styles.main_div}>
						<PromoterManageHeader
							openAnnouncementMdal={openAnnouncementMdal}
							setAddPerformerModalOpen={handleOpenModal}
						/>
						<div className={styles.bottom_div}>
							<div className={styles.roster_third_splitter}>
								<div className={styles.roser_head}>Not Checked In</div>
								<div className={styles.yellow_bar_thing} />
								<NotCheckedInHelper />
							</div>
							<div className={styles.roster_third_splitter}>
								<div className={styles.roser_head}>In Queue</div>
								<div className={styles.yellow_bar_thing} />
								<InQueueHelper setChangeAudioModal={setChangeAudioModal} />
							</div>
							<div className={styles.roster_third_splitter}>
								<div className={styles.roser_head}>Has Performed</div>
								<div className={styles.yellow_bar_thing} />
								<AlreadyPerformedHelper />
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default PromoterManageEventDesktop;
