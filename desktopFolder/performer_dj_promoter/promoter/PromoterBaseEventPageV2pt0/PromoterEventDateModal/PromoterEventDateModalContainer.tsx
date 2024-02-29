/** @format */

import { useEffect, useState } from "react";
import PromoterEventDateModal from "./PromoterEventDateModal";
import { setSelectedSpecificEvent } from "@/store/PromoterEventPageV2pt0Slice";
import { useDispatch, useSelector } from "react-redux";
import { getPromoterDateModalDataV2pt0 } from "@/api_functions/getPromoterDateModalDataV2pt0";
import { RootState } from "@/app/LocalizationProviderHelper";
import { setPromoterDateInfoV2pt0 } from "@/store/promoterDateInfoV2pt0Slice";
import SplashPage from "@/SplashPage";
import styles from "./styles.module.css";
import CheckInQrAndKeyModal from "./CheckInQrAndKeyModal";
import PromoterEditEventDesktop from "./PromoterEditEventDesktop";
// import { useSessionState } from "@/custom_hooks/useSessionState";
import { getDjDateInviteLinkAgain } from "@/api_functions/getDjInviteLinkAgain";
import { Snackbar, Alert } from "@mui/material";

interface PromoterEventDateModalContainerProps {
	eventNameFromParams: string;
}

function PromoterEventDateModalContainer({
	eventNameFromParams,
}: PromoterEventDateModalContainerProps) {
	const dispatch = useDispatch();

	const wlo = window.location.origin;

	const { selected_specific_event: selectedSpecificevent } = useSelector(
		(state: RootState) => state.PromoterEventPageV2pt0Slice
	);

	const dateState = useSelector(
		(state: RootState) => state.promoterDateInfoV2pt0Slice
	);

	// const [editIsOpen, setEditIsOpen] = useSessionState("editIsOpen", false);
	const [editIsOpen, setEditIsOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [qrModalOpen, setQrModalOpen] = useState(false);
	const [dateLink, setDateLink] = useState("");
	const [isLoadingInvite, setIsLoadingInvite] = useState(false);
	const [dateSnack, setDateSnack] = useState(false);
	const [notOffered, setNotOffered] = useState(false);

	const noDateLinkLoaded = dateLink === "";

	function handlClose() {
		dispatch(setSelectedSpecificEvent(null));
	}

	useEffect(() => {
		if (selectedSpecificevent) {
			getPromoterDateModalDataV2pt0(selectedSpecificevent).then((data) => {
				if (data) {
					dispatch(setPromoterDateInfoV2pt0(data));
					setIsLoading(false);
				}
			});
		}
	}, []);

	const dateShareData = {
		title: "Date Dj Invite",
		text: "Link for DJ to accept date",
		url: dateLink,
	};

	function handleDateLink() {
		if (dateState.specific_event_id) {
			setIsLoadingInvite(true);
			getDjDateInviteLinkAgain(dateState.specific_event_id).then((res) => {
				console.log("res", res);
				setDateLink(`${wlo}/dj_accept_date/${res}`);
				setIsLoadingInvite(false);
			});
		}
	}

	async function handleShareDateUrl() {
		try {
			await navigator.share(dateShareData);
		} catch (error: any) {
			if (error.message !== "Abort due to cancellation of share.") {
				setNotOffered(true);
			}
		}
	}

	const handleCopyDateToClipboard = () => {
		navigator.clipboard.writeText(dateLink).then(
			function () {
				setDateSnack(true);
			},
			function (err) {
				console.error("Async: Could not copy text: ", err);
			}
		);
	};

	const handleDateSnackClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		setDateSnack(false);
	};

	return (
		<>
			{editIsOpen ? (
				<PromoterEditEventDesktop
					baseEventId={dateState.base_event_id}
					specificEventId={dateState.specific_event_id}
					handleCloseModal={() => setEditIsOpen(false)}
				/>
			) : null}
			{qrModalOpen ? (
				<CheckInQrAndKeyModal
					closeModal={() => setQrModalOpen(false)}
					specificEventId={
						selectedSpecificevent ? selectedSpecificevent.toString() : ""
					}
					startTime={dateState.start_time}
					eventName={eventNameFromParams}
				/>
			) : null}
			<div className={styles.main_div} onClick={handlClose}>
				<div className={styles.paper_div} onClick={(e) => e.stopPropagation()}>
					{isLoading ? (
						<SplashPage />
					) : (
						<>
							<Snackbar
								open={notOffered}
								autoHideDuration={6000}
								onClose={() => setNotOffered(false)}>
								<Alert
									onClose={() => setNotOffered(false)}
									severity="error"
									sx={{ width: "100%" }}>
									Share feature not available in this browser
								</Alert>
							</Snackbar>
							<Snackbar
								open={dateSnack}
								autoHideDuration={6000}
								onClose={handleDateSnackClose}>
								<Alert
									onClose={handleDateSnackClose}
									severity="success"
									sx={{ width: "100%" }}>
									Date Dj Link Copied!
								</Alert>
							</Snackbar>
							<PromoterEventDateModal
								handleSetEditOpen={() => setEditIsOpen(true)}
								handlClose={handlClose}
								paramsEventName={eventNameFromParams}
								setQrModalOpen={setQrModalOpen}
								noDateLinkLoaded={noDateLinkLoaded}
								isLoadingInvite={isLoadingInvite}
								handleCopyDateToClipboard={handleCopyDateToClipboard}
								handleDateLink={handleDateLink}
								handleShareDateUrl={handleShareDateUrl}
							/>
						</>
					)}
				</div>
			</div>
		</>
	);
}

export default PromoterEventDateModalContainer;
