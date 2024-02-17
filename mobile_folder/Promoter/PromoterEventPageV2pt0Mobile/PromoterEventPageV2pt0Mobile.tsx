/** @format */

import { useState } from "react";
import {
	Button,
	Tabs,
	Tab,
	ButtonGroup,
	Box,
	LinearProgress,
} from "@mui/material";
import AppBarMobile from "@mobi/AppBarMobile";
import {
	ArrowBackIosNewRounded,
	EditRounded,
	IosShareRounded,
	AddCircleRounded,
	CampaignRounded,
	WarningAmberRounded,
	InsertLinkRounded,
	PersonAddAltRounded,
} from "@mui/icons-material";
import styles from "./styles.module.css";
import EventDjCard from "../EventDjCard";
import PromoterEventDateListHelper from "./PromoterEventDateListHelper";
import { PromoterEventPageV2pt0SliceType } from "@/store/PromoterEventPageV2pt0Slice";
import DescriptionComponent from "@mobi/DescriptionComponent";

interface PromoterEventPageV2pt0MobileProps {
	handleBack: () => void;
	pageState: PromoterEventPageV2pt0SliceType;
	djLinkIsLoading: boolean;
	noInviteLinkSet: boolean;
	handleCopyEventToClipboard: () => void;
	handleShareEventUrl: () => void;
	handleInviteHouseDj: () => void;
	handleCreateDate: () => void;
	handleClickEdit: () => void;
	eventNameFromParams: string;
}

function PromoterEventPageV2pt0Mobile({
	handleBack,
	pageState,
	noInviteLinkSet,
	djLinkIsLoading,
	handleCopyEventToClipboard,
	handleShareEventUrl,
	handleInviteHouseDj,
	handleCreateDate,
	eventNameFromParams,
	handleClickEdit,
}: PromoterEventPageV2pt0MobileProps) {
	const [tab, setTab] = useState(1);

	const eventDataObj = pageState.event_data;

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
			</AppBarMobile>
			<div className={styles.main_div}>
				<div className={styles.backdrop_banner}>
					<img
						src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_3X1/banner_${eventDataObj.base_event_id}`}
						style={{ height: "100%", width: "100%", opacity: "0.75" }}
					/>
					<div className={styles.overlay_div}>
						<div className={styles.main_banner_container}>
							<div className={styles.main_banner}>
								<img
									src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_3X1/banner_${eventDataObj.base_event_id}`}
									style={{ height: "100%", width: "100%", opacity: "0.75" }}
								/>
							</div>
						</div>
						<div className={styles.fade_out_div} />
						<div className={styles.pic_name_tagline_div}>
							<div className={styles.pic_div}>
								<div className={styles.pic_deco}>
									<img
										src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${eventDataObj.base_event_id}.jpg`}
										style={{
											width: "100%",
											height: "100%",
										}}
									/>
								</div>
							</div>
							<div className={styles.name_tagline}>
								<div className={styles.name_div}>{eventDataObj.event_name}</div>
								<div className={styles.tagline_div}>
									{eventDataObj.event_tagline}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.buttons_div}>
					<Button
						onClick={handleCreateDate}
						color="success"
						sx={{ marginLeft: "5px" }}
						startIcon={<AddCircleRounded />}
						variant="contained"
						size="small">
						create event date
					</Button>
					<Button
						onClick={handleClickEdit}
						startIcon={<EditRounded />}
						sx={{ marginLeft: "5px" }}
						variant="outlined"
						size="small">
						edit event
					</Button>
				</div>
				<div className={styles.buttons_div}>
					<Button
						color="warning"
						sx={{ marginLeft: "5px" }}
						startIcon={<CampaignRounded />}
						variant="outlined"
						size="small">
						announcement
					</Button>
					<Button
						startIcon={<IosShareRounded />}
						sx={{ marginLeft: "5px" }}
						variant="outlined"
						size="small">
						share event
					</Button>
				</div>
				<Tabs
					sx={{ width: "100%" }}
					value={tab}
					onChange={(e, newValue) => {
						setTab(newValue);
					}}
					aria-label="basic tabs example">
					<Tab label="Info" value={1} sx={{ width: "50%" }} />
					<Tab label="Event Dates" value={2} sx={{ width: "50%" }} />
				</Tabs>
				{tab === 1 ? (
					<>
						{eventDataObj.primary_dj ? (
							<div className={styles.dj_div}>
								<EventDjCard
									djObj={eventDataObj.primary_dj}
									baseEventId={eventDataObj.base_event_id.toString()}
									isForBaseEvent
								/>
							</div>
						) : (
							<div className={styles.invite_dj_div}>
								{noInviteLinkSet ? (
									<Button
										color="warning"
										disabled={djLinkIsLoading}
										onClick={handleInviteHouseDj}
										startIcon={
											<PersonAddAltRounded
												sx={{ width: "30px", height: "30px" }}
											/>
										}
										sx={{
											width: "calc(100% - 10px)",
											height: "85%",
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
									<div className={styles.loaded_invite_div}>
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
											className={styles.invite_warning_box}
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
												Anyone with link can accept invite
											</div>
										</Box>
									</div>
								)}
							</div>
						)}
						<div className={styles.desc_dov}>
							<DescriptionComponent text={eventDataObj.event_description} />
						</div>
					</>
				) : null}
				{tab === 2 ? (
					<PromoterEventDateListHelper paramsEventname={eventNameFromParams} />
				) : null}
			</div>
		</>
	);
}

export default PromoterEventPageV2pt0Mobile;
