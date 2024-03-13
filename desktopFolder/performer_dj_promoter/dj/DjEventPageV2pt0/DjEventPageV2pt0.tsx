/** @format */

import HomeBarV2 from "@desk/HomeBarV2";
import {
	ArrowBackIosRounded,
	CancelPresentationRounded,
} from "@mui/icons-material";
import { Button, Divider, LinearProgress } from "@mui/material";
import styles from "./styles.module.css";
import PersonRow from "@desk/PersonRow";
import DescriptionComponent from "@desk/DescriptionComponent";
import DjEventPageListHelper from "./DjEventPageListHelper";
import { DjEventPageType } from "../../../../api_functions/getDjEventPageDataV2pt0";

interface DjEventPageV2pt0Props {
	handleBack: () => void;
	pageData: DjEventPageType;
	setConfirmEventQuit: React.Dispatch<React.SetStateAction<boolean>>;
}

function DjEventPageV2pt0({
	handleBack,
	pageData,
	setConfirmEventQuit,
}: DjEventPageV2pt0Props) {
	return (
		<>
			<HomeBarV2 hasProfile>
				<>
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
				</>
			</HomeBarV2>
			<div className={styles.main_div}>
				<div className={styles.background_pic}>
					<img
						src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_4X1/banner_${pageData.base_event_id}`}
						style={{ height: "100%", width: "100%" }}
					/>
				</div>
				<div className={styles.blur_overlay}>
					<div className={styles.fade_away} />
				</div>
				<div className={styles.inner_main_div}>
					<div className={styles.main_left}>
						<div className={styles.banner_container}>
							<div className={styles.banner}>
								<img
									src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_4X1/banner_${pageData.base_event_id}`}
									style={{ height: "100%", width: "100%" }}
								/>
							</div>
						</div>
						<div className={styles.main_below_banner}>
							<div className={styles.pic_name_tagline}>
								<div className={styles.pic_container}>
									<div className={styles.pic_deco}>
										<img
											src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_pictures/event_${pageData.base_event_id}.jpg`}
											style={{
												width: "100%",
												height: "100%",
											}}
										/>
									</div>
								</div>
								<div className={styles.name_tagline}>
									<div className={styles.event_name}>{pageData.event_name}</div>
									<div className={styles.event_tagling}>{pageData.tagline}</div>
								</div>
								<div className={styles.share_follow}>
									<Button
										onClick={() => setConfirmEventQuit(true)}
										startIcon={<CancelPresentationRounded />}
										color="warning"
										variant="outlined">
										resign as event dj
									</Button>
								</div>
							</div>
							<div className={styles.promoter_and_dj}>
								<div className={styles.promoter_or_div}>
									<PersonRow
										cameFrom="performer"
										id={pageData.promoter.promoter_id}
										name={pageData.promoter.promoter_name}
										tagline={pageData.promoter.promoter_tagline}
										userSub={pageData.promoter.promoter_sub}
										promoter
										inputHeight="120px"
									/>
								</div>
							</div>
							<div className={styles.divider_div}>
								<Divider variant="middle" flexItem />
							</div>
							<div className={styles.desc_div}>
								<div className={styles.inner_desc_div}>
									<DescriptionComponent text={pageData.event_description} />
								</div>
							</div>
						</div>
					</div>
					<div className={styles.main_right}>
						<DjEventPageListHelper
							upcomingDates={pageData.upcoming_dates}
							previousDates={pageData.previous_dates}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default DjEventPageV2pt0;
