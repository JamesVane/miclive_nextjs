/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import AppBarMobile from "@mobi/AppBarMobile";
import SkeletonOrImage from "@/SkeletonOrImage";
import { Button, Tabs, Tab, LinearProgress } from "@mui/material";
import {
	BookmarkRemoveRounded,
	BookmarkAddRounded,
	ArrowBackIosNewRounded,
	AttachMoneyRounded,
	IosShareRounded,
} from "@mui/icons-material";
import PersonRowMobile from "@mobi/PersonRowMobile";
import EventDateListHelper from "./EventDateListHelper";
import { AuthEventPageData } from "./EventPageReducer";
import DescriptionComponent from "@mobi/DescriptionComponent";
import horizLogo from "@/images/miclive_svg_horiz.svg";
import MessagingButton from "@mobi/Messaging/MessagingButton";
import Image from "next/image";

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
	const [tab, setTab] = useState(1);

	return (
		<>
			<AppBarMobile>
				<Button
					onClick={handleBack}
					size="small"
					sx={{ position: "absolute", left: "0px" }}
					startIcon={<ArrowBackIosNewRounded />}
					color="secondary">
					back
				</Button>
				<div className={styles.logo_div}>
					<Image alt="logo" src={horizLogo} style={{ width: "100%" }} />
				</div>
			</AppBarMobile>
			<div className={styles.main_div}>
				<div className={styles.backdrop_banner}>
					<SkeletonOrImage
						type="event3X1"
						id={AuthEventPageData.base_event_id}
					/>
					<div className={styles.overlay_div}>
						<div className={styles.main_banner_container}>
							<div className={styles.main_banner}>
								<SkeletonOrImage
									type="event3X1"
									id={AuthEventPageData.base_event_id}
								/>
							</div>
						</div>
						<div className={styles.fade_out_div} />
						<div className={styles.pic_name_tagline_div}>
							<div className={styles.pic_div}>
								<div className={styles.pic_deco}>
									<SkeletonOrImage
										type="event"
										id={AuthEventPageData.base_event_id}
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
					{authStatus === "performer auth" ? (
						<Button
							disabled={followingInProgress}
							onClick={handleFollowButton}
							variant="outlined"
							size="small"
							startIcon={
								isAlreadyFollowing ? (
									<BookmarkRemoveRounded />
								) : (
									<BookmarkAddRounded />
								)
							}
							color={isAlreadyFollowing ? "warning" : "primary"}
							sx={{
								position: "relative",
								overflow: "hidden",
								marginLeft: "5px",
							}}>
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
						startIcon={<IosShareRounded />}
						sx={{ marginLeft: "5px" }}
						variant="outlined"
						size="small">
						share
					</Button>
					<Button
						color="success"
						startIcon={<AttachMoneyRounded />}
						sx={{ marginLeft: "5px" }}
						variant="outlined"
						size="small">
						Buy Ticket
					</Button>
				</div>
				<Tabs
					sx={{ width: "100%" }}
					value={tab}
					onChange={(e, newValue) => {
						setTab(newValue);
					}}
					aria-label="basic tabs example">
					<Tab label="Description" value={1} sx={{ width: "50%" }} />
					<Tab label="Event Dates" value={2} sx={{ width: "50%" }} />
				</Tabs>
				{tab === 1 ? (
					<>
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
						{AuthEventPageData.dj ? (
							<div className={styles.promoter_dj_row}>
								<PersonRowMobile
									info={AuthEventPageData.dj.dj_info}
									name={AuthEventPageData.dj.dj_name}
									type="dj"
									roleId={AuthEventPageData.dj.dj_id}
									tagline={AuthEventPageData.dj.dj_tagline}
									userSub={AuthEventPageData.dj.dj_sub}
									key={AuthEventPageData.dj.dj_sub}
								/>
							</div>
						) : null}
						<div className={styles.desc_dov}>
							<DescriptionComponent
								text={AuthEventPageData.event_description}
							/>
						</div>
					</>
				) : (
					<EventDateListHelper
						previousArray={AuthEventPageData.previousDates}
						upcomingArray={AuthEventPageData.upcomingDates}
					/>
				)}
			</div>
			{authStatus === "not performer" ? null : (
				<>
					<div className={styles.message_div}>
						<MessagingButton notAbsolute />
					</div>

					<div style={{ width: "100%", height: "70px" }} />
				</>
			)}
		</>
	);
}

export default EventPage;
