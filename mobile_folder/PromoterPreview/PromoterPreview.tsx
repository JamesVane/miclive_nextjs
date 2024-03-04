/** @format */

import {
	ArrowBackIosNewRounded,
	LocationCityRounded,
	EmailRounded,
	Instagram,
	InsertLinkRounded,
	LocalPhoneRounded,
	IosShareRounded,
	LoginRounded,
	HomeRounded,
	ContentCopyRounded,
	MessageRounded,
} from "@mui/icons-material";
import PromoterPreviewListHelper from "./PromoterPreviewListHelper";
import styles from "./styles.module.css";
import AvatarSimpleMobile from "@mobi/small_components/AvatarSimpleMobile";
import AppBarMobile from "@mobi/AppBarMobile";
import { Button } from "@mui/material";
import { PromoterPreviewData } from "@/api_functions/getPromoterPreviewPageDataV2pt0";
import MessagingButton from "@mobi/Messaging/MessagingButton";

interface PromoterPreviewProps {
	pageData: PromoterPreviewData;
	isAuth: boolean;
	handleMessage: () => void;
}

function PromoterPreview({
	pageData,
	isAuth,
	handleMessage,
}: PromoterPreviewProps) {
	const copyIconstyles = {
		height: "18px",
		width: "18px",
		alignSelf: "start",
		marginTop: "2.5px",
		opacity: "0.4",
	};

	const promoterInfoObj = pageData.promoter_info;

	return (
		<>
			<AppBarMobile>
				<></>
			</AppBarMobile>
			<div className={styles.main_div}>
				<div className={styles.backdrop_banner}>
					<img
						src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/promoter_banner_3X1/banner_${pageData.promoter_id}`}
						style={{ height: "100%", width: "100%" }}
					/>
					<div className={styles.overlay_div}>
						<div className={styles.main_banner_container}>
							<div className={styles.main_banner}>
								<img
									src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/promoter_banner_3X1/banner_${pageData.promoter_id}`}
									style={{ height: "100%", width: "100%" }}
								/>
							</div>
						</div>
						<div className={styles.fade_out_div} />
						<div className={styles.pic_name_tagline_div}>
							<div className={styles.pic_div}>
								<AvatarSimpleMobile
									type="promoter"
									id={pageData.promoter_id}
									username={pageData.promoter_name}
								/>
							</div>
							<div className={styles.name_tagline}>
								<div className={styles.name_div}>{pageData.promoter_name}</div>
								<div className={styles.tagline_div}>
									{pageData.promoter_tagline}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.buttons_div}>
					{isAuth ? (
						<Button
							onClick={handleMessage}
							sx={{ marginLeft: "5px" }}
							size="small"
							variant="outlined"
							startIcon={<MessageRounded />}>
							{" "}
							message
						</Button>
					) : null}
					<Button
						sx={{ marginLeft: "5px" }}
						size="small"
						variant="outlined"
						startIcon={<IosShareRounded />}>
						{" "}
						share
					</Button>
				</div>
				<>
					{promoterInfoObj ? (
						<>
							{promoterInfoObj.Phone ? (
								<div className={styles.promoter_info_row}>
									<LocalPhoneRounded />{" "}
									<div className={styles.text_div}>
										<div className={styles.elipse_text}>
											{promoterInfoObj.Phone}
										</div>
									</div>
									<ContentCopyRounded sx={copyIconstyles} />
								</div>
							) : null}
							{promoterInfoObj.Email ? (
								<div className={styles.promoter_info_row}>
									<EmailRounded />
									<div className={styles.text_div}>
										<div className={styles.elipse_text}>
											{promoterInfoObj.Email}
										</div>
									</div>
									<ContentCopyRounded sx={copyIconstyles} />
								</div>
							) : null}
							{promoterInfoObj.City ? (
								<div className={styles.promoter_info_row}>
									<LocationCityRounded />
									<div className={styles.text_div}>
										<div className={styles.elipse_text}>
											{promoterInfoObj.City}
										</div>
									</div>
									<ContentCopyRounded sx={copyIconstyles} />
								</div>
							) : null}
							{promoterInfoObj.IG ? (
								<div className={styles.promoter_info_row}>
									<Instagram />
									<div className={styles.text_div}>
										<div className={styles.elipse_text}>
											{promoterInfoObj.IG}
										</div>
									</div>
									<ContentCopyRounded sx={copyIconstyles} />
								</div>
							) : null}
							{promoterInfoObj.Link ? (
								<div className={styles.promoter_info_row}>
									<InsertLinkRounded />
									<div className={styles.text_div}>
										<div className={styles.elipse_text}>
											{promoterInfoObj.Link}
										</div>
									</div>
									<ContentCopyRounded sx={copyIconstyles} />
								</div>
							) : null}
						</>
					) : null}
				</>
				<PromoterPreviewListHelper eventsArray={pageData.events} />
			</div>
			<div className={styles.fade_div} />
			<div
				style={{
					position: "fixed",
					bottom: 0,
					left: 0,
					right: 0,
					zIndex: "200",
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					height: "70px",
				}}>
				<MessagingButton />
			</div>
		</>
	);
}

export default PromoterPreview;
