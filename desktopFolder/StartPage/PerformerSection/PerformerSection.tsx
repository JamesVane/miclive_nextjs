/** @format */
import { memo } from "react";
import styles from "./styles.module.css";
import performerHoriz from "../../../images/mid_performer_horiz.png";
import { Divider, Button } from "@mui/material";
import { MicExternalOnRounded, CircleRounded } from "@mui/icons-material";
import Image from "next/image";

interface PerformerSectionProps {
	scrollPercent: number;
	inputRef: React.RefObject<HTMLDivElement>;
}

function PerformerSection({ inputRef, scrollPercent }: PerformerSectionProps) {
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
		<div id="performer" ref={inputRef} className={styles.main_div}>
			<Image src={performerHoriz} alt="performer" className={styles.pic_div} />
			<div
				className={styles.info_section_container}
				style={{ clipPath: `inset(0 ${100 - adjustedWidth * 100}% 0 0)` }}>
				<div className={styles.info_section}>
					<div className={styles.person_title}>
						<MicExternalOnRounded
							sx={{ height: "55px", width: "55px", marginRight: "15px" }}
						/>
						Performer
					</div>
					<div className={styles.divider_div}>
						<Divider variant="middle" flexItem />
					</div>
					<div className={styles.bullet_point_div}>
						<CircleRounded sx={iconStyles} />
						Never miss a performance time
					</div>
					<div className={styles.bullet_point_div}>
						<CircleRounded sx={iconStyles} />
						submit audio files ahead of time and save them to your account
					</div>
					<div className={styles.bullet_point_div}>
						<CircleRounded sx={iconStyles} />
						Easily communicate with the Promoter and DJ at an event
					</div>
					<div className={styles.bullet_point_div}>
						<CircleRounded sx={iconStyles} />
						Find an artist's contact info the next day if you missed them at an
						event
					</div>
				</div>
			</div>
			<Button
				startIcon={
					<MicExternalOnRounded sx={{ height: "35px", width: "35px" }} />
				}
				variant="contained"
				sx={{
					position: "absolute",
					bottom: "20px",
					right: "20px",
					height: "50px",
					fontSize: "25px",
				}}>
				sign-up as performer
			</Button>
		</div>
	);
}

export default memo(PerformerSection);
