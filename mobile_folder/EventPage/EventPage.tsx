/** @format */
"use client";
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
import DescriptionComponent from "@mobi/DescriptionComponent";
import MessagingButton from "@mobi/Messaging/MessagingButton";
import Drawer from "@mui/material/Drawer";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Auth } from "aws-amplify";
import { EventPageDataType } from "@desk/NewEventPage/NewEventPageReducer";
import { putPerformerFollowEvent } from "@/api_functions/putPerformerFollowEvent";

interface EventPageProps {
	AuthEventPageData: EventPageDataType;
	authStatus: "performer auth" | "not performer";
}

function EventPage({ AuthEventPageData, authStatus }: EventPageProps) {
	const router = useRouter();

	const [isAlreadyFollowing, setIsAlreadyFollowing] = useState(false);
	const [followingInProgress, setFollowingInProgress] = useState(false);

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

	function handleBack() {
		router.push("/performer");
	}

	function openModal() {
		router.push(pathname + "?" + createQueryString("modal", "true"));
	}

	function closeModal() {
		router.push(pathname + "?" + createQueryString("modal", "false"));
	}

	const refreshData = () => {
		router.refresh();
	};

	const drawerContainerWindowDocumentBody =
		window !== undefined ? () => window.document.body : undefined;

	async function handleFollowButton() {
		setFollowingInProgress(true);
		try {
			const user = await Auth.currentAuthenticatedUser();
			const roleId = user.attributes["custom:RoleId"];
			const roleIdAsNumber =
				typeof roleId === "string" ? parseInt(roleId) : roleId;
			if (parsedpageData.base_event_id !== 0) {
				putPerformerFollowEvent({
					request_performer_role_id: roleIdAsNumber,
					request_new_following_id: parsedpageData.base_event_id,
				}).then(async (res) => {
					await Auth.updateUserAttributes(user, {
						"custom:PerformerFollowing": JSON.stringify(res),
					}).then(() => {
						refreshData();
					});
					setFollowingInProgress(false);
				});
			} else {
				console.log("following failed");
				setFollowingInProgress(false);
			}
		} catch {
			console.log("following failed");
			setFollowingInProgress(false);
		}
	}

	const parsedpageData = AuthEventPageData.pageState.data;

	return (
		<>
			<Drawer
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
						previousArray={parsedpageData.previousDates}
						upcomingArray={parsedpageData.upcomingDates}
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
						src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_3X1/banner_${parsedpageData.base_event_id}`}
						style={{ height: "100%", width: "100%" }}
					/>
					<div className={styles.overlay_div}>
						<div className={styles.main_banner_container}>
							<div className={styles.main_banner}>
								<img
									src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_3X1/banner_${parsedpageData.base_event_id}`}
									style={{ height: "100%", width: "100%" }}
								/>
							</div>
						</div>
						<div className={styles.fade_out_div} />
						<div className={styles.pic_name_tagline_div}>
							<div className={styles.pic_div}>
								<div className={styles.pic_deco}>
									<img
										src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${parsedpageData.base_event_id}.jpg`}
										style={{
											width: "100%",
											height: "100%",
										}}
									/>
								</div>
							</div>
							<div className={styles.name_tagline}>
								<div className={styles.name_div}>
									{parsedpageData.event_name}
								</div>
								<div className={styles.tagline_div}>
									{parsedpageData.event_tagline}
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
				{parsedpageData.promoter ? (
					<div className={styles.promoter_dj_row}>
						<PersonRowMobile
							info={parsedpageData.promoter.promoter_info}
							name={parsedpageData.promoter.promoter_name}
							type="promoter"
							roleId={parsedpageData.promoter.promoter_id}
							tagline={parsedpageData.promoter.promoter_tagline}
							userSub={parsedpageData.promoter.promoter_sub}
							key={parsedpageData.promoter.promoter_sub}
						/>
					</div>
				) : null}
				<div className={styles.desc_dov}>
					<DescriptionComponent text={parsedpageData.event_description} />
				</div>
			</div>
		</>
	);
}

export default EventPage;
