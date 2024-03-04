/** @format */

import styles from "./styles.module.css";
import { Avatar, IconButton, Button } from "@mui/material";
import AvatarSimpleMobile from "@mobi/small_components/AvatarSimpleMobile";
import {
	MicExternalOnRounded,
	CampaignRounded,
	AlbumRounded,
	CloseRounded,
	MessageOutlined,
	FormatListBulletedRounded,
} from "@mui/icons-material";
import InfoValuesMobile from "./InfoValuesMobile";
import DividerH from "@/universalComponents/DividerH";

interface ViewUserInfoModalMobileProps {
	roleId: number;
	userType: "performer" | "promoter" | "dj";
	name: string;
	tagline: string;
	info: {
		City?: string;
		Email?: string;
		Phone?: string;
		IG?: string;
		Link?: string;
	} | null;
	handleClose: () => void;
	handleMessage: () => void;
	handleNavigatePromoterPreview: () => void;
}

function ViewUserInfoModalMobile({
	roleId,
	userType,
	name,
	tagline,
	info,
	handleClose,
	handleMessage,
	handleNavigatePromoterPreview,
}: ViewUserInfoModalMobileProps) {
	return (
		<div className={styles.main_div} onClick={handleClose}>
			<div onClick={(e) => e.stopPropagation()} className={styles.main_paper}>
				<div className={styles.top_div}>
					<div className={styles.avatar_div}>
						<AvatarSimpleMobile
							username={name}
							type={userType}
							id={roleId}
							ninety
						/>
						<Avatar
							sx={{
								border: "1px solid #888661ff",
								zIndex: "100",
								height: "25px",
								width: "25px",
								position: "absolute",
								bottom: "5px",
								right: "5px",
								color: "primary.main",
								backgroundColor: "#272727ff",
							}}>
							{userType === "performer" ? (
								<MicExternalOnRounded sx={{ width: "85%", height: "85%" }} />
							) : userType === "promoter" ? (
								<CampaignRounded sx={{ width: "85%", height: "85%" }} />
							) : (
								<AlbumRounded sx={{ width: "85%", height: "85%" }} />
							)}
						</Avatar>
					</div>
					<div className={styles.top_div_right}>
						<div className={styles.close_button}>
							<IconButton
								onClick={handleClose}
								sx={{ width: "100%", height: "100%" }}
								color="secondary">
								<CloseRounded />
							</IconButton>
						</div>
						<div className={styles.top_div_right_top}>{name}</div>
						<div className={styles.top_div_right_bottom}>{tagline}</div>
					</div>
				</div>
				<div className={styles.button_div}>
					<Button
						onClick={handleMessage}
						startIcon={<MessageOutlined />}
						sx={{
							width: "calc(50% - 5px)",
							height: "100%",
							fontSize: "15px",
							marginRight: "5px",
						}}
						variant="outlined">
						message
					</Button>
					{userType === "promoter" ? (
						<Button
							onClick={handleNavigatePromoterPreview}
							startIcon={<FormatListBulletedRounded />}
							sx={{
								width: "calc(50% - 5px)",
								height: "100%",
								fontSize: "15px",
								marginLeft: "5px",
							}}
							variant="outlined">
							view events
						</Button>
					) : null}
				</div>
				{info ? (
					<>
						<DividerH />
						<InfoValuesMobile isLink={false} value={info.City} type="City" />
						<InfoValuesMobile isLink={false} value={info.Email} type="Email" />
						<InfoValuesMobile isLink={false} value={info.Phone} type="Phone" />
						<InfoValuesMobile isLink={true} value={info.IG} type="IG" />
						<InfoValuesMobile isLink={true} value={info.Link} type="Link" />
					</>
				) : null}
			</div>
		</div>
	);
}

export default ViewUserInfoModalMobile;
