/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import { Divider } from "@mui/material";
import AvatarSimple from "@desk/AvatarSimple";
import { AlternateEmailRounded } from "@mui/icons-material";
import { Performer } from "@/api_functions/getSingleDateInfoWithPerformerId";

interface DatePagePreviousRosterPaperProps {
	performerData: Performer;
	index: number;
}

function DatePagePreviousRosterPaper({
	performerData,
	index,
}: DatePagePreviousRosterPaperProps) {
	const [isHovering, setIsHovering] = useState<boolean>(false);

	return (
		<div
			className={styles.roster_paper}
			style={{
				backgroundColor: isHovering ? "#272727ff" : "#0f0f0fff",
			}}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}>
			<div className={styles.roster_paper_content}>
				<div className={styles.performer_pic_number_div}>
					<AvatarSimple ninety type="performer" id={performerData.performer} />
				</div>
				<div
					className={styles.roster_row_middle_div}
					style={{
						color: isHovering ? "#888661ff" : "white",
					}}>
					{performerData.performer_name}
					<div className={styles.performed_at_div}>
						<AlternateEmailRounded
							color="primary"
							sx={{ height: "20px", width: "20px", marginRight: "4px" }}
						/>{" "}
						8:44 PM - 8:51 PM
					</div>
				</div>
				<div className={styles.performer_pic_number_div}>
					<div className={styles.row_number}>{index}</div>
				</div>
			</div>
			<div className={styles.divider_div}>
				<Divider flexItem variant="middle" />
			</div>
		</div>
	);
}

export default DatePagePreviousRosterPaper;
