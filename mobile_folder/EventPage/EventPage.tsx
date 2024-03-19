/** @format */

import { useState, useCallback } from "react";
import styles from "./styles.module.css";
import AppBarMobile from "@mobi/AppBarMobile";
import { Button, LinearProgress, IconButton } from "@mui/material";
import {
	BookmarkRemoveRounded,
	BookmarkAddRounded,
	ArrowBackIosNewRounded,
	AttachMoneyRounded,
	IosShareRounded,
	CloseRounded,
} from "@mui/icons-material";
import PersonRowMobile from "@mobi/PersonRowMobile";
import EventDateListHelper from "./EventDateListHelper";
import { AuthEventPageData } from "./EventPageReducer";
import DescriptionComponent from "@mobi/DescriptionComponent";
import MessagingButton from "@mobi/Messaging/MessagingButton";
import Drawer from "@mui/material/Drawer";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

interface EventPageProps {
	AuthEventPageData: AuthEventPageData;
	isAlreadyFollowing: boolean;
	authStatus: "performer auth" | "not performer";
	handleBack: () => void;
	handleFollowButton: () => void;
	followingInProgress: boolean;
}

function EventPage({
	AuthEventPageData,
	isAlreadyFollowing,
	authStatus,
	handleBack,
	handleFollowButton,
	followingInProgress,
}: EventPageProps) {
	const router = useRouter();

	const searchParams = useSearchParams();
	const pathname = usePathname();

	const modalState = searchParams.get("modal")
		? searchParams.get("modal") === "true"
			? true
			: searchParams.get("modal") === "false"
			? false
			: false
		: false;

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	function openModal() {
		router.push(pathname + "?" + createQueryString("modal", "true"));
	}

	function closeModal() {
		router.push(pathname + "?" + createQueryString("modal", "false"));
	}

	const drawerContainerWindowDocumentBody =
		window !== undefined ? () => window.document.body : undefined;

	return (
		<>
			<Drawer
				// PaperProps={{ ref: swipeablePaperRef }}
				container={drawerContainerWindowDocumentBody}
				anchor="bottom"
				open={modalState}
				onClose={() => {
					closeModal();
				}}
				elevation={1}>
				<div className={styles.bottom_drawer_div}>
					<IconButton
						onClick={() => {
							closeModal();
						}}
						color="secondary"
						sx={{
							position: "absolute",
							top: "-20px",
							right: "5px",
							zIndex: 2000,
						}}>
						<CloseRounded />
					</IconButton>
					<div className={styles.bottom_drawer_tab} />

					<EventDateListHelper
						previousArray={AuthEventPageData.previousDates}
						upcomingArray={AuthEventPageData.upcomingDates}
					/>
				</div>
			</Drawer>
			<AppBarMobile>
				<Button
					onClick={handleBack}
					size="small"
					sx={{ position: "absolute", left: "0px" }}
					startIcon={<ArrowBackIosNewRounded />}
					color="secondary">
					back
				</Button>
				<div className={styles.app_bar_absolute}>
					{authStatus === "performer auth" ? (
						<Button
							onClick={handleFollowButton}
							disabled={followingInProgress}
							sx={{
								marginLeft: "5px",
								position: "relative",
								overflow: "hidden",
							}}
							startIcon={
								isAlreadyFollowing ? (
									<BookmarkRemoveRounded />
								) : (
									<BookmarkAddRounded />
								)
							}
							color={isAlreadyFollowing ? "warning" : "primary"}
							size="small">
							{isAlreadyFollowing ? "un-follow" : "follow"}
							{followingInProgress ? (
								<LinearProgress
									color={isAlreadyFollowing ? "warning" : "primary"}
									sx={{
										width: "100%",
										position: "absolute",
										bottom: "0px",
									}}
								/>
							) : null}
						</Button>
					) : null}
					<Button
						sx={{ marginLeft: "5px" }}
						startIcon={<IosShareRounded />}
						size="small">
						share
					</Button>
				</div>
			</AppBarMobile>
			<div className={styles.main_div}>
				<div className={styles.backdrop_banner}>
					<img
						src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_3X1/banner_${AuthEventPageData.base_event_id}`}
						style={{ height: "100%", width: "100%" }}
					/>
					<div className={styles.overlay_div}>
						<div className={styles.main_banner_container}>
							<div className={styles.main_banner}>
								<img
									src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_3X1/banner_${AuthEventPageData.base_event_id}`}
									style={{ height: "100%", width: "100%" }}
								/>
							</div>
						</div>
						<div className={styles.fade_out_div} />
						<div className={styles.pic_name_tagline_div}>
							<div className={styles.pic_div}>
								<div className={styles.pic_deco}>
									<img
										src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${AuthEventPageData.base_event_id}.jpg`}
										style={{
											width: "100%",
											height: "100%",
										}}
									/>
								</div>
							</div>
							<div className={styles.name_tagline}>
								<div className={styles.name_div}>
									{AuthEventPageData.event_name}
								</div>
								<div className={styles.tagline_div}>
									{AuthEventPageData.event_tagline}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.buttons_div}>
					<Button
						onClick={openModal}
						color="success"
						startIcon={<AttachMoneyRounded />}
						sx={{ marginLeft: "5px" }}
						variant="contained"
						size="large">
						Buy Ticket
					</Button>
				</div>
				{AuthEventPageData.promoter ? (
					<div className={styles.promoter_dj_row}>
						<PersonRowMobile
							info={AuthEventPageData.promoter.promoter_info}
							name={AuthEventPageData.promoter.promoter_name}
							type="promoter"
							roleId={AuthEventPageData.promoter.promoter_id}
							tagline={AuthEventPageData.promoter.promoter_tagline}
							userSub={AuthEventPageData.promoter.promoter_sub}
							key={AuthEventPageData.promoter.promoter_sub}
						/>
					</div>
				) : null}
				<div className={styles.desc_dov}>
					<DescriptionComponent text={AuthEventPageData.event_description} />
				</div>
			</div>
		</>
	);
}

export default EventPage;
