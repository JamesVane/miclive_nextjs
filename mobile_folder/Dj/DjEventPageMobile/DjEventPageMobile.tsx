/** @format */

import { useState } from "react";
import AppBarMobile from "@mobi/AppBarMobile";
import {
	ArrowBackIosNewRounded,
	IosShareRounded,
	AddCircleRounded,
	CancelPresentationRounded,
} from "@mui/icons-material";
import { Button, Tabs, Tab, LinearProgress } from "@mui/material";
import styles from "./styles.module.css";
import SkeletonOrImage from "@/SkeletonOrImage";
import PersonRowMobile from "@mobi/PersonRowMobile";
import { DjEventPageType } from "@/api_functions/getDjEventPageDataV2pt0";
import DescriptionComponent from "@mobi/DescriptionComponent";
import DjEventPageRosterHelper from "./DjEventPageRosterHelper";

interface DjEventPageMobileProps {
	handleBack: () => void;
	pageData: DjEventPageType;
	setConfirmEventQuit: React.Dispatch<React.SetStateAction<boolean>>;
}

function DjEventPageMobile({
	handleBack,
	pageData,
	setConfirmEventQuit,
}: DjEventPageMobileProps) {
	const [tab, setTab] = useState(1);

	const promoterInfo = pageData.promoter;

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
					<SkeletonOrImage type="event3X1" id={pageData.base_event_id} />
					<div className={styles.overlay_div}>
						<div className={styles.main_banner_container}>
							<div className={styles.main_banner}>
								<SkeletonOrImage type="event3X1" id={pageData.base_event_id} />
							</div>
						</div>
						<div className={styles.fade_out_div} />
						<div className={styles.pic_name_tagline_div}>
							<div className={styles.pic_div}>
								<div className={styles.pic_deco}>
									<SkeletonOrImage type="event" id={pageData.base_event_id} />
								</div>
							</div>
							<div className={styles.name_tagline}>
								<div className={styles.name_div}>{pageData.event_name}</div>
								<div className={styles.tagline_div}>{pageData.tagline}</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.buttons_div}>
					<Button
						onClick={() => setConfirmEventQuit(true)}
						color="warning"
						sx={{ marginLeft: "5px" }}
						startIcon={<CancelPresentationRounded />}
						variant="outlined"
						size="small">
						resign as event dj
					</Button>
					<Button
						startIcon={<IosShareRounded />}
						sx={{ marginLeft: "5px" }}
						variant="outlined"
						size="small">
						share
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
						<div className={styles.promoter_row}>
							<PersonRowMobile
								type="promoter"
								info={promoterInfo.promoter_info}
								name={promoterInfo.promoter_name}
								roleId={promoterInfo.promoter_id}
								tagline={promoterInfo.promoter_tagline}
								userSub={promoterInfo.promoter_sub}
								key={promoterInfo.promoter_sub}
							/>
						</div>
						<div className={styles.desc_dov}>
							<DescriptionComponent text={pageData.event_description} />
						</div>
					</>
				) : null}
				{tab === 2 ? (
					<DjEventPageRosterHelper
						previousArray={pageData.previous_dates}
						upcomingArray={pageData.upcoming_dates}
					/>
				) : null}
			</div>
		</>
	);
}

export default DjEventPageMobile;
