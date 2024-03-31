/** @format */

import styles from "./styles.module.css";
import AvatarSimple from "@desk/AvatarSimple";
import {
	LocalPhoneRounded,
	EmailRounded,
	Instagram,
	LocationCity,
	InsertLinkRounded,
	MessageRounded,
	IosShareRounded,
} from "@mui/icons-material";
import { Button, Tabs, Tab } from "@mui/material";
import HomeBarV2 from "@desk/HomeBarV2";
import { PromoterPreviewData } from "@/api_functions_not_user/getPromoterPreviewPageDataV2pt0";
import PromoterProfileGridSquareHelper from "./PromoterProfileGridSquareHelper";

interface ViewPromoterProfilePageProps {
	pageData: PromoterPreviewData;
	isAuth: boolean;
	handleMessage: () => void;
}

function ViewPromoterProfilePage({
	pageData,
	isAuth,
	handleMessage,
}: ViewPromoterProfilePageProps) {
	const iconStyles = {
		width: "45px",
		height: "45px",
		marginRight: "10px",
	};

	return (
		<>
			<HomeBarV2 noMessage={!isAuth}>
				<div
					style={{
						height: "100%",
						display: "flex",
						flexDirection: "row",
						alignItems: "flex-end",
					}}>
					<Tabs
						value={"profile"}
						textColor="primary"
						indicatorColor="primary"
						aria-label="secondary tabs example">
						<Tab
							value="profile"
							label="promoter profile"
							sx={{ fontSize: "25px" }}
						/>
					</Tabs>
				</div>
			</HomeBarV2>
			<div className={styles.main_div}>
				<div className={styles.top_bannaer_background}>
					<img
						src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/promoter_banner_4X1/banner_${pageData.promoter_id}`}
						style={{ height: "100%", width: "100%" }}
					/>
					<div className={styles.filter_div}>
						<div className={styles.top_left}>
							<div className={styles.banner_container}>
								<div className={styles.banner_pic}>
									<img
										src={`https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/event_banner_4X1/banner_${pageData.promoter_id}`}
										style={{ height: "100%", width: "100%" }}
									/>
								</div>
							</div>
							<div className={styles.below_banner}>
								<div className={styles.promoter_pic}>
									<AvatarSimple
										username={pageData.promoter_name}
										type="promoter"
										id={pageData.promoter_id}
									/>
								</div>
								<div className={styles.name_tagline}>
									<div className={styles.event_name}>
										{pageData.promoter_name}
									</div>
									<div className={styles.event_tagling}>
										{pageData.promoter_tagline}
									</div>
									<div className={styles.share_follow}>
										{isAuth ? (
											<Button
												onClick={handleMessage}
												variant="outlined"
												startIcon={<MessageRounded />}
												sx={{ fontSize: "15px" }}>
												message
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
							</div>
						</div>
						<div className={styles.top_right}>
							<div className={styles.promoter_info_deco}>
								{pageData.promoter_info ? (
									<>
										{pageData.promoter_info.Phone ? (
											<div className={styles.promoter_info_row}>
												<LocalPhoneRounded sx={iconStyles} />
												<div className={styles.elipses_text}>
													{pageData.promoter_info.Phone}
												</div>
											</div>
										) : null}
										{pageData.promoter_info.Email ? (
											<div className={styles.promoter_info_row}>
												<EmailRounded sx={iconStyles} />
												<div className={styles.elipses_text}>
													{pageData.promoter_info.Email}
												</div>
											</div>
										) : null}
										{pageData.promoter_info.IG ? (
											<div className={styles.promoter_info_row}>
												<Instagram sx={iconStyles} />
												<div className={styles.elipses_text}>
													{pageData.promoter_info.IG}
												</div>
											</div>
										) : null}
										{pageData.promoter_info.City ? (
											<div className={styles.promoter_info_row}>
												<LocationCity sx={iconStyles} />
												<div className={styles.elipses_text}>
													{pageData.promoter_info.City}
												</div>
											</div>
										) : null}
										{pageData.promoter_info.Link ? (
											<div className={styles.promoter_info_row}>
												<InsertLinkRounded sx={iconStyles} />
												<div className={styles.elipses_text}>
													{pageData.promoter_info.Link}
												</div>
											</div>
										) : null}
									</>
								) : null}
							</div>
						</div>
						<div className={styles.fade_away} />
					</div>
				</div>
				<PromoterProfileGridSquareHelper eventsArray={pageData.events} />
			</div>
		</>
	);
}

export default ViewPromoterProfilePage;
