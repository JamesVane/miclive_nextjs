/** @format */

import { memo } from "react";
import styles from "./styles.module.css";
import { Divider, Button } from "@mui/material";
import promoterHoriz from "../../../images/mid_promoter_horiz.png";
import { CircleRounded, CampaignRounded } from "@mui/icons-material";
import Image from "next/image";

interface PromoterSectionProps {
	inputRef: React.RefObject<HTMLDivElement>;
	scrollPercent: number;
}

function PromoterSection({ inputRef, scrollPercent }: PromoterSectionProps) {
	const adjustedWidth =
		scrollPercent * 10 > 1 ? 1 - (scrollPercent * 10 - 1) : scrollPercent * 10;

	const iconStyles = {
		height: "40px",
		width: "40px",
		marginRight: "15px",
		marginTop: "2.5px",
		alignSelf: "start",
		color: "secondary.main",
	};
	return (
		<div id="promoter" ref={inputRef} className={styles.main_div}>
			<Image src={promoterHoriz} alt="promoter" className={styles.pic_div} />
			<div
				className={styles.info_section_container}
				style={{ clipPath: `inset(0 ${100 - adjustedWidth * 100}% 0 0)` }}>
				<div className={styles.info_section}>
					<div className={styles.person_title}>
						<CampaignRounded
							sx={{ height: "55px", width: "55px", marginRight: "15px" }}
						/>
						Promoter
					</div>
					<div className={styles.divider_div}>
						<Divider variant="middle" flexItem />
					</div>
					<div className={styles.bullet_point_div}>
						<CircleRounded sx={iconStyles} />
						Payments and checkin made as easy as can be d
					</div>
					<div className={styles.bullet_point_div}>
						<CircleRounded sx={iconStyles} />
						Send announcements to all artists who are attending an event
					</div>
					<div className={styles.bullet_point_div}>
						<CircleRounded sx={iconStyles} />
						See detailed statastics and metrics from previous events
					</div>
					<div className={styles.bullet_point_div}>
						<CircleRounded sx={iconStyles} />
						Advertise your event to the correct audience
					</div>
				</div>
				I
			</div>
			<Button
				startIcon={<CampaignRounded sx={{ height: "35px", width: "35px" }} />}
				variant="contained"
				sx={{
					position: "absolute",
					bottom: "20px",
					right: "20px",
					height: "50px",
					fontSize: "25px",
				}}>
				sign-up as promoter
			</Button>
		</div>
	);
}

export default memo(PromoterSection);
