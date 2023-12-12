/** @format */

import { memo } from "react";
import styles from "./styles.module.css";
import djHoriz from "../../../images/mid_dj_horiz.png";
import { Divider, Button } from "@mui/material";
import { CircleRounded, AlbumRounded } from "@mui/icons-material";
import Image from "next/image";

interface DjSectionProps {
	inputRef: React.RefObject<HTMLDivElement>;
	scrollPercent: number;
}

function DjSection({ inputRef, scrollPercent }: DjSectionProps) {
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
		<div id="dj" ref={inputRef} className={styles.main_div}>
			<Image src={djHoriz} alt="dj" className={styles.pic_div} />
			<div
				className={styles.info_section_container}
				style={{ clipPath: `inset(0 ${100 - adjustedWidth * 100}% 0 0)` }}>
				<div className={styles.info_section}>
					<div className={styles.person_title}>
						<AlbumRounded
							sx={{ height: "55px", width: "55px", marginRight: "15px" }}
						/>
						DJ
					</div>
					<div className={styles.divider_div}>
						<Divider variant="middle" flexItem />
					</div>
					<div className={styles.bullet_point_div}>
						<CircleRounded sx={iconStyles} />
						Performers are notified by text when they should be ready to perform
					</div>
					<div className={styles.bullet_point_div}>
						<CircleRounded sx={iconStyles} />
						Download performer's pre submitted audio files from one place
					</div>
					<div className={styles.bullet_point_div}>
						<CircleRounded sx={iconStyles} />
						easily communicate with performers during an event
					</div>
					<div className={styles.bullet_point_div}>
						<CircleRounded sx={iconStyles} />
						Know exactly how much time you have to give each performer
					</div>
				</div>
			</div>
			<Button
				startIcon={<AlbumRounded sx={{ height: "35px", width: "35px" }} />}
				variant="contained"
				sx={{
					position: "absolute",
					bottom: "20px",
					right: "20px",
					height: "50px",
					fontSize: "25px",
				}}>
				sign-up as dj
			</Button>
		</div>
	);
}

export default memo(DjSection);
