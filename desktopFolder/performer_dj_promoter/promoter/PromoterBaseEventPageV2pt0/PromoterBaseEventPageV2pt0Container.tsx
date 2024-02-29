/** @format */
"use client";
import { useEffect, useState } from "react";
import PromoterBaseEventPageV2pt0 from "./PromoterBaseEventPageV2pt0";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import { getPromoterEventPageDataV2pt0 } from "@/api_functions/getPromoterEventPageDataV2pt0";
import { setPageData } from "@/store/PromoterEventPageV2pt0Slice";
import SplashPage from "@/SplashPage";
// import { useSessionState } from "@/custom_hooks/useSessionState";
import PromoterEditBaseEvent from ".//PromoterEditBaseEventDesktop";
import { Snackbar, Alert } from "@mui/material";
import { getDjBaseInviteLink } from "@/api_functions/getDjInviteLinkAgain";
import { useRouter } from "next/navigation";

interface PromoterBaseEventPageV2pt0ContainerProps {
	paramsEventName: string;
}

function PromoterBaseEventPageV2pt0Container({
	paramsEventName,
}: PromoterBaseEventPageV2pt0ContainerProps) {
	const router = useRouter();
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);
	const [inviteLink, setInviteLink] = useState("");
	const noInviteLinkSet = inviteLink === "";
	// const [editIsOpen, setEditIsOpen] = useSessionState("editIsOpen", false);
	const [editIsOpen, setEditIsOpen] = useState(false);
	const [djLinkIsLoading, setDjLinkIsLoading] = useState(false);
	const [notOffered, setNotOffered] = useState(false);
	const [eventSnack, setEventSnack] = useState(false);

	const pageState = useSelector(
		(state: RootState) => state.PromoterEventPageV2pt0Slice
	);

	function handleGoHome() {
		router.push("/promoter");
	}

	function navigateToCreateDate() {
		router.push(`/promoter/create_date/${pageState.event_data.base_event_id}`);
	}

	useEffect(() => {
		getPromoterEventPageDataV2pt0(paramsEventName).then((data) => {
			if (data) {
				dispatch(setPageData(data));
			}
			setIsLoading(false);
		});
	}, []);

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
					{editIsOpen ? (
						<PromoterEditBaseEvent
							handleCloseModal={() => setEditIsOpen(false)}
							baseEventId={pageState.event_data.base_event_id}
						/>
					) : null}
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
						<PromoterBaseEventPageV2pt0
							handleGoHome={handleGoHome}
							pageState={pageState}
							handleClickEdit={() => setEditIsOpen(true)}
							navigateToCreateDate={navigateToCreateDate}
							noInviteLinkSet={noInviteLinkSet}
							djLinkIsLoading={djLinkIsLoading}
							handleCopyEventToClipboard={handleCopyEventToClipboard}
							handleShareEventUrl={handleShareEventUrl}
							handleInviteHouseDj={handleInviteHouseDj}
						/>
					</>
				</>
			)}
		</>
	);
}

export default PromoterBaseEventPageV2pt0Container;
