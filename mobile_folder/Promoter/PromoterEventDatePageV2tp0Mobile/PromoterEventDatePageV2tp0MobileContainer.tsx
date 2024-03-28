/** @format */
"use client";

import { useEffect, useState } from "react";
import PromoterEventDatePageV2tp0Mobile from "./PromoterEventDatePageV2tp0Mobile";
import { useDispatch, useSelector } from "react-redux";
import { getPromoterDateModalDataV2pt0 } from "@/api_functions/getPromoterDateModalDataV2pt0";
import { setPromoterDateInfoV2pt0 } from "@/store/promoterDateInfoV2pt0Slice";
import { useRouter } from "next/navigation";
import SplashPage from "@/SplashPage";
import { RootState } from "@/app/LocalizationProviderHelper";
import { getDjDateInviteLinkAgain } from "@/api_functions/getDjInviteLinkAgain";
import { Snackbar, Alert } from "@mui/material";
import QrInfoMobileModal from "./QrInfoMobileModal";

interface PromoterEventDatePageV2tp0MobileContainerProps {
	eventNamefromParams: string;
	specificEventIdFromParams: string;
}

function PromoterEventDatePageV2tp0MobileContainer({
	eventNamefromParams,
	specificEventIdFromParams,
}: PromoterEventDatePageV2tp0MobileContainerProps) {
	const dispatch = useDispatch();
	const router = useRouter();

	const wlo = window.location.origin;

	const dateState = useSelector(
		(state: RootState) => state.promoterDateInfoV2pt0Slice
	);

	const [qrModalOpen, setQrModalOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadingInvite, setIsLoadingInvite] = useState(false);
	const [dateLink, setDateLink] = useState("");
	const [notOffered, setNotOffered] = useState(false);
	const [dateSnack, setDateSnack] = useState(false);

	const dateShareData = {
		title: "Date Dj Invite",
		text: "Link for DJ to accept date",
		url: dateLink,
	};

	const noDateLinkLoaded = dateLink === "";

	function handleNavigateBack() {
		router.push(`/promoter/event/${eventNamefromParams}`);
	}

	function handleEditDate() {
		router.push(
			`/promoter/event/edit_date/${specificEventIdFromParams}/${eventNamefromParams}`
		);
	}

	useEffect(() => {
		getPromoterDateModalDataV2pt0(Number(specificEventIdFromParams)).then(
			(data) => {
				if (data) {
					dispatch(setPromoterDateInfoV2pt0(data));
					setIsLoading(false);
				}
			}
		);
	}, []);

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
					{qrModalOpen ? (
						<QrInfoMobileModal
							closeModal={() => setQrModalOpen(false)}
							specificEventId={specificEventIdFromParams}
							startTime={dateState.start_time}
							eventName={eventNamefromParams}
						/>
					) : null}
					<PromoterEventDatePageV2tp0Mobile
						setQrModalOpen={setQrModalOpen}
						handleNavigateBack={handleNavigateBack}
						paramsEventName={eventNamefromParams}
						isLoadingInvite={isLoadingInvite}
						noDateLinkLoaded={noDateLinkLoaded}
						handleShareDateUrl={handleShareDateUrl}
						handleCopyDateToClipboard={handleCopyDateToClipboard}
						handleDateLink={handleDateLink}
						handleEditDate={handleEditDate}
					/>
				</>
			)}
		</>
	);
}

export default PromoterEventDatePageV2tp0MobileContainer;
