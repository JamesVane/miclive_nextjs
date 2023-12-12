/** @format */

import HomeBarV2 from "@desk/HomeBarV2";
import styles from "./styles.module.css";
import {
	Tabs,
	Tab,
	Button,
	Divider,
	LinearProgress,
	ButtonGroup,
	Box,
} from "@mui/material";
import SkeletonOrImage from "@/SkeletonOrImage";
import {
	AnnouncementRounded,
	IosShareRounded,
	AddBoxRounded,
	EditRounded,
	PersonAddAltRounded,
	HomeRounded,
	WarningAmberRounded,
	InsertLinkRounded,
} from "@mui/icons-material";
import EventDjCard from "./EventDjCard";
import PromoterEventDateListHelper from "./PromoterEventDateListHelper";
import { PromoterEventPageV2pt0SliceType } from "@/store/PromoterEventPageV2pt0Slice";
import PromoterEventDateModal from "./PromoterEventDateModal";
import DescriptionComponent from "@desk/DescriptionComponent";

interface PromoterBaseEventPageV2pt0Props {
	handleGoHome: () => void;
	pageState: PromoterEventPageV2pt0SliceType;
	handleClickEdit: () => void;
	navigateToCreateDate: () => void;
	noInviteLinkSet: boolean;
	djLinkIsLoading: boolean;
	handleCopyEventToClipboard: () => void;
	handleShareEventUrl: () => void;
	handleInviteHouseDj: () => void;
}

function PromoterBaseEventPageV2pt0({
	handleGoHome,
	pageState,
	handleClickEdit,
	navigateToCreateDate,
	noInviteLinkSet,
	djLinkIsLoading,
	handleCopyEventToClipboard,
	handleShareEventUrl,
	handleInviteHouseDj,
}: PromoterBaseEventPageV2pt0Props) {
	const openDateId = pageState ? pageState.selected_specific_event : null;
	const eventData = pageState.event_data;

	return (
		<>
			<HomeBarV2>
				<Button
					onClick={handleGoHome}
					variant="outlined"
					sx={{ position: "absolute", left: "230px" }}
					startIcon={<HomeRounded />}>
					home
				</Button>
				<Tabs value={0} textColor="primary" indicatorColor="primary">
					<Tab
						value={0}
						label="Promoter event page"
						sx={{ fontSize: "25px" }}
					/>
				</Tabs>
			</HomeBarV2>
			{openDateId ? (
				<PromoterEventDateModal eventNameFromParams={eventData.event_name} />
			) : null}
			<div className={styles.main_div}>
				<div className={styles.background_pic}>
					<SkeletonOrImage type="event4X1" id={eventData.base_event_id} />
				</div>

				<div className={styles.blur_overlay}>
					<div className={styles.fade_away} />
				</div>
				<div className={styles.inner_main_div}>
					<div className={styles.main_left}>
						<div className={styles.banner_container}>
							<div className={styles.banner}>
								<SkeletonOrImage type="event4X1" id={eventData.base_event_id} />
							</div>
						</div>
						<div className={styles.main_below_banner}>
							<div className={styles.pic_name_tagline}>
								<div className={styles.pic_container}>
									<div className={styles.pic_deco}>
										<SkeletonOrImage
											type="event"
											id={eventData.base_event_id}
										/>
									</div>
								</div>
								<div className={styles.name_tagline}>
									<div className={styles.event_name}>
										{eventData.event_name}
									</div>
									<div className={styles.event_tagling}>
										{eventData.event_tagline}
									</div>
								</div>
							</div>
							<div className={styles.buttons_div}>
								<Button
									onClick={navigateToCreateDate}
									color="success"
									startIcon={<AddBoxRounded />}
									variant="contained"
									size="large">
									create event date
								</Button>
								<Button
									onClick={handleClickEdit}
									sx={{ marginLeft: "5px" }}
									startIcon={<EditRounded />}
									variant="outlined"
									size="large">
									edit event
								</Button>
								<Button
									sx={{ marginLeft: "5px" }}
									startIcon={<IosShareRounded />}
									variant="outlined"
									size="large">
									share event
								</Button>
								<Button
									startIcon={<AnnouncementRounded />}
									sx={{ marginLeft: "5px" }}
									variant="outlined"
									size="large">
									newsletter
								</Button>
							</div>

							{eventData.primary_dj ? (
								<div className={styles.dj_container}>
									<EventDjCard
										djObj={eventData.primary_dj}
										baseEventId={eventData.base_event_id.toString()}
										isForBaseEvent
									/>
								</div>
							) : (
								<div className={styles.add_house_dj}>
									{noInviteLinkSet ? (
										<Button
											disabled={djLinkIsLoading}
											onClick={handleInviteHouseDj}
											startIcon={
												<PersonAddAltRounded
													sx={{ width: "30px", height: "30px" }}
												/>
											}
											sx={{
												width: "100%",
												height: "90%",
												fontSize: "20px",
												position: "relative",
												overflow: "hidden",
											}}
											variant="outlined">
											invite house dj
											{djLinkIsLoading ? (
												<LinearProgress
													color="warning"
													sx={{
														position: "absolute",
														width: "100%",
														bottom: "0px",
														zIndex: "100",
													}}
												/>
											) : null}
										</Button>
									) : (
										<div className={styles.add_house_dj_loaded_div}>
											<ButtonGroup size="small">
												<Button
													onClick={handleCopyEventToClipboard}
													startIcon={<InsertLinkRounded />}>
													copy link
												</Button>
												<Button
													onClick={handleShareEventUrl}
													startIcon={<IosShareRounded />}>
													share
												</Button>
											</ButtonGroup>
											<Box
												className={styles.warning_div}
												sx={{ color: "warning.main" }}>
												<div>
													<WarningAmberRounded
														sx={{
															height: "20px",
															width: "20px",
															marginTop: "5px",
															marginBottom: "-5px",
															marginRight: "2.5px",
														}}
													/>
													Anyone with link
												</div>
												<div>can accept invite</div>
											</Box>
										</div>
									)}
								</div>
							)}

							<div className={styles.divider_div}>
								<Divider variant="middle" flexItem />
							</div>
							<div className={styles.desc_div}>
								<div className={styles.inner_desc_div}>
									<DescriptionComponent text={eventData.event_description} />
								</div>
							</div>
						</div>
					</div>
					<div className={styles.main_right}>
						<PromoterEventDateListHelper />
					</div>
				</div>
			</div>
		</>
	);
}

export default PromoterBaseEventPageV2pt0;
