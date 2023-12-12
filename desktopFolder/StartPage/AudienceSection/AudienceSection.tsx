/** @format */

import { memo } from "react";
import styles from "./styles.module.css";
import audienceHoriz from "../../../images/mid_audience_horiz.png";
import {
	ConstructionRounded,
	CircleRounded,
	GroupsRounded,
} from "@mui/icons-material";
import { Divider, Button } from "@mui/material";
import Image from "next/image";

interface AudienceSectionProps {
	inputRef: React.RefObject<HTMLDivElement>;
	scrollPercent: number;
}

function AudienceSection({ inputRef, scrollPercent }: AudienceSectionProps) {
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
		<div id="audience" ref={inputRef} className={styles.main_div}>
			<Image src={audienceHoriz} alt="audience" className={styles.pic_div} />
			<div
				className={styles.info_section_container}
				style={{ clipPath: `inset(0 ${100 - adjustedWidth * 100}% 0 0)` }}>
				<div className={styles.info_section}>
					<div className={styles.person_title}>
						<GroupsRounded
							sx={{ height: "55px", width: "55px", marginRight: "15px" }}
						/>
						Audience
					</div>
					<div className={styles.divider_div}>
						<Divider variant="middle" flexItem />
					</div>
					<div className={styles.bullet_point_div}>
						<CircleRounded sx={iconStyles} />
						Find and support local talent
					</div>
					<div className={styles.bullet_point_div}>
						<CircleRounded sx={iconStyles} />
						check who will be performing at an event before you go
					</div>
					<div className={styles.bullet_point_div}>
						<CircleRounded sx={iconStyles} />
						Read and write reviews for performers and events
					</div>
					<div className={styles.bullet_point_div}>
						<CircleRounded sx={iconStyles} />
						Follow your favorite artists to see when they perform next
					</div>
				</div>
			</div>
			<Button
				disabled={true}
				startIcon={
					<ConstructionRounded sx={{ height: "35px", width: "35px" }} />
				}
				variant="contained"
				sx={{
					position: "absolute",
					bottom: "20px",
					right: "20px",
					height: "50px",
					fontSize: "25px",
				}}>
				coming soon
			</Button>
		</div>
	);
}

export default memo(AudienceSection);
