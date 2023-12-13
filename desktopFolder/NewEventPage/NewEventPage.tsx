/** @format */
"use client";

import styles from "./styles.module.css";
import HomeBarV2 from "@desk/HomeBarV2";
import SkeletonOrImage from "@/SkeletonOrImage";
import NewEventPageDateListHelper from "./NewEventPageDateListHelper";
import PersonRow from "@desk/PersonRow";
import { Button, LinearProgress } from "@mui/material";
import {
	BookmarkAddRounded,
	IosShareRounded,
	BookmarkRemoveRounded,
	ArrowBackIosRounded,
} from "@mui/icons-material";
import { AuthEventPageData } from "./NewEventPageReducer";
import { useRouter } from "next/navigation";
import DescriptionComponent from "@desk/DescriptionComponent";
import DividerH from "@/universalComponents/DividerH";

interface NewEventPageProps {
	hasFromState: boolean;
	AuthEventPageData: AuthEventPageData;
	authStatus: "performer auth" | "not performer";
	isAlreadyFollowing: boolean;
	/* handleFollowButton: () => void; */
	followingInProgress: boolean;
}

function NewEventPage({
	hasFromState,
	AuthEventPageData,
	authStatus,
	isAlreadyFollowing,
	/* handleFollowButton, */
	followingInProgress,
}: NewEventPageProps) {
	const router = useRouter();

	const djData = AuthEventPageData.dj;
	const promoterData = AuthEventPageData.promoter;

	async function handleBack() {
		router.back();
	}

	function handleFollowButton() {}

	return (
		<>
			<HomeBarV2 hasProfile>
				<>
					{hasFromState ? (
						<Button
							onClick={handleBack}
							startIcon={<ArrowBackIosRounded />}
							variant="outlined"
							sx={{
								position: "absolute",
								left: "230px",
							}}>
							back
						</Button>
					) : null}
				</>
			</HomeBarV2>
			<div className={styles.main_div}>
				<div className={styles.background_pic}>
					<SkeletonOrImage
						type="event4X1"
						id={AuthEventPageData.base_event_id}
					/>
				</div>

				<div className={styles.blur_overlay}>
					<div className={styles.fade_away} />
				</div>
				<div className={styles.inner_main_div}>
					<div className={styles.main_left}>
						<div className={styles.banner_container}>
							<div className={styles.banner}>
								<SkeletonOrImage
									type="event4X1"
									id={AuthEventPageData.base_event_id}
								/>
							</div>
						</div>

						<div className={styles.main_below_banner}>
							<div className={styles.pic_name_tagline}>
								<div className={styles.pic_container}>
									<div className={styles.pic_deco}>
										<SkeletonOrImage
											type="event"
											id={AuthEventPageData.base_event_id}
										/>
									</div>
								</div>
								<div className={styles.name_tagline}>
									<div className={styles.event_name}>
										{AuthEventPageData.event_name}
									</div>
									<div className={styles.event_tagling}>
										{AuthEventPageData.event_tagline}
									</div>
								</div>
								<div className={styles.share_follow}>
									{authStatus === "performer auth" ? (
										<Button
											disabled={followingInProgress}
											onClick={handleFollowButton}
											variant="outlined"
											startIcon={
												isAlreadyFollowing ? (
													<BookmarkRemoveRounded />
												) : (
													<BookmarkAddRounded />
												)
											}
											color={isAlreadyFollowing ? "warning" : "primary"}
											sx={{
												fontSize: "15px",
												position: "relative",
												overflow: "hidden",
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
										variant="outlined"
										startIcon={<IosShareRounded />}
										sx={{ marginLeft: "15px", fontSize: "15px" }}>
										share
									</Button>
								</div>
							</div>
							<div className={styles.promoter_and_dj}>
								<div className={styles.promoter_or_div}>
									{promoterData ? (
										<PersonRow
											cameFrom="performer"
											id={promoterData.promoter_id}
											name={promoterData.promoter_name}
											tagline={promoterData.promoter_tagline}
											userSub={promoterData.promoter_sub}
											promoter
										/>
									) : null}
								</div>
								<div className={styles.promoter_or_div}>
									{djData ? (
										<PersonRow
											cameFrom="performer"
											id={djData.dj_id}
											name={djData.dj_name}
											tagline={djData.dj_tagline}
											userSub={djData.dj_sub}
											dj
										/>
									) : null}
								</div>
							</div>
							<DividerH />
							<div className={styles.desc_div}>
								<div className={styles.inner_desc_div}>
									{/* <DescriptionComponent
										text={AuthEventPageData.event_description}
									/> */}
								</div>
							</div>
						</div>
					</div>
					{/* <div className={styles.main_right}>
						<NewEventPageDateListHelper
							eventName={AuthEventPageData.event_name}
							upcomingArray={AuthEventPageData.upcomingDates}
							previousArray={AuthEventPageData.previousDates}
						/>
					</div> */}
				</div>
			</div>
		</>
	);
}

export default NewEventPage;
