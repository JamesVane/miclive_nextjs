/** @format */
"use client";

import { useEffect, useState } from "react";
import PromoterEventPageV2pt0Mobile from "./PromoterEventPageV2pt0Mobile";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import { setPageData } from "@/store/PromoterEventPageV2pt0Slice";
import { getPromoterEventPageDataV2pt0 } from "@/api_functions/getPromoterEventPageDataV2pt0";
import SplashPage from "@/SplashPage";
import { getDjBaseInviteLink } from "@/api_functions/getDjInviteLinkAgain";
import { Snackbar, Alert } from "@mui/material";

interface PromoterEventPageV2pt0MobileContainerProps {
	eventNameFromParams: string;
}

function PromoterEventPageV2pt0MobileContainer({
	eventNameFromParams,
}: PromoterEventPageV2pt0MobileContainerProps) {
	const router = useRouter();
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [inviteLink, setInviteLink] = useState("");
	const noInviteLinkSet = inviteLink === "";
	const [djLinkIsLoading, setDjLinkIsLoading] = useState(false);
	const [eventSnack, setEventSnack] = useState(false);
	const [notOffered, setNotOffered] = useState(false);

	useEffect(() => {
		getPromoterEventPageDataV2pt0(eventNameFromParams).then((data) => {
			if (data) {
				dispatch(setPageData(data));
			}
			setIsLoading(false);
		});
	}, []);

	function handleBack() {
		router.push("/m/promoter");
	}

	function handleClickEdit() {
		router.push(`/m/promoter/event/edit_event/${eventNameFromParams}`);
	}

	function handleCreateDate() {
		router.push(
			`/m/promoter/create_date/${pageState.event_data.base_event_id}`
		);
	}

	const pageState = useSelector(
		(state: RootState) => state.PromoterEventPageV2pt0Slice
	);

	function handleInviteHouseDj() {
		setDjLinkIsLoading(true);
		getDjBaseInviteLink(pageState.event_data.base_event_id).then((response) => {
			setInviteLink(`${window.location.origin}/dj_accept_event/${response}`);
			setDjLinkIsLoading(false);
		});
	}

	const eventShareData = {
		title: "Event Dj Invite",
		text: "Link for DJ to accept event",
		url: inviteLink,
	};

	async function handleShareEventUrl() {
		try {
			await navigator.share(eventShareData);
		} catch (error: any) {
			if (error.message !== "Abort due to cancellation of share.") {
				setNotOffered(true);
			}
		}
	}

	const handleCopyEventToClipboard = () => {
		navigator.clipboard.writeText(inviteLink).then(
			function () {
				setEventSnack(true);
			},
			function (err) {
				console.error("Async: Could not copy text: ", err);
			}
		);
	};

	const handleEventSnackClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string
	) => {
		if (reason === "clickaway") {
			return;
		}

		setEventSnack(false);
	};

	return (
		<>
			{isLoading ? (
				<SplashPage />
			) : (
				<>
					<Snackbar
						open={eventSnack}
						autoHideDuration={6000}
						onClose={handleEventSnackClose}>
						<Alert
							onClose={handleEventSnackClose}
							severity="success"
							sx={{ width: "100%" }}>
							Event Dj Link Copied!
						</Alert>
					</Snackbar>
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
					<PromoterEventPageV2pt0Mobile
						pageState={pageState}
						handleBack={handleBack}
						noInviteLinkSet={noInviteLinkSet}
						djLinkIsLoading={djLinkIsLoading}
						handleCopyEventToClipboard={handleCopyEventToClipboard}
						handleShareEventUrl={handleShareEventUrl}
						handleInviteHouseDj={handleInviteHouseDj}
						handleCreateDate={handleCreateDate}
						handleClickEdit={handleClickEdit}
						eventNameFromParams={eventNameFromParams}
					/>
				</>
			)}
		</>
	);
}

export default PromoterEventPageV2pt0MobileContainer;
