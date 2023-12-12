/** @format */

import React from "react";
import styles from "./styles.module.css";
import SkeletonOrImage from "@/SkeletonOrImage";
import DividerH from "@/universalComponents/DividerH";
import { Button } from "@mui/material";
import { DownloadRounded } from "@mui/icons-material";
import { getSignedUrl } from "@/api_functions/getAnySignedUrl";

interface PromoterCurrentEventStatsProps {
	qrUuid: string;
	checkinKey: string;
	startTime: number;
	eventName: string;
}

function PromoterCurrentEventStats({
	qrUuid,
	checkinKey,
	startTime,
	eventName,
}: PromoterCurrentEventStatsProps) {
	function epochSecondsToMillis(epochSeconds: number): number {
		return epochSeconds * 1000;
	}

	function formatDate(epochMillis: number): string {
		const date = new Date(epochMillis);
		const month = String(date.getMonth() + 1).padStart(2, "0"); // +1 because months are 0-based
		const day = String(date.getDate()).padStart(2, "0");
		const year = date.getFullYear();

		return `${month}-${day}-${year}`;
	}

	function handleDownload() {
		getSignedUrl("qr", qrUuid).then(async (res) => {
			const formattedDate = formatDate(epochSecondsToMillis(startTime));
			if (res) {
				const signedURL = res;

				const response = await fetch(signedURL);
				console.log("fetched thing:", response);
				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.style.display = "none";
				a.href = url;
				a.download = `${eventName}-${formattedDate}.png`;
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);
			} else console.log("FAILURE");
		});
	}

	return (
		<>
			<div className={styles.qr_div}>
				<SkeletonOrImage type="qr" id={qrUuid} />
			</div>
			<Button
				size="large"
				startIcon={<DownloadRounded />}
				onClick={handleDownload}
				sx={{ marginTop: "10px", marginBottom: "10px" }}
				variant="outlined">
				download qr code
			</Button>
			<DividerH />
			<div className={styles.key_row}>
				<div className={styles.key_title}>Check-In Key:</div>
				<div className={styles.checkin_key}>{checkinKey}</div>
			</div>
		</>
	);
}

export default PromoterCurrentEventStats;

/* const progressStyles = {
	position: "absolute",
	zIndex: "250",
	marginTop: "50px",
}; */

/* 
<div className={styles.stats_main_div}>
			<div className={styles.stats_large_div}>
				<div className={styles.total_performers_div}>
					<div
						className={styles.total_performers_text}
						style={{ color: "#ed0304" }}>
						Won't Perform: 00
					</div>
					<div className={styles.total_performers_text}>
						Total Performers: 000
					</div>
				</div>
				<CircularProgress
					variant="determinate"
					value={100}
					sx={{
						...progressStyles,
						color: "#9ca1a3ff",
					}}
					size={200}
				/>
				<CircularProgress
					variant="determinate"
					value={75}
					sx={{
						...progressStyles,
						color: "#f28b47ff",
					}}
					size={200}
				/>
				<CircularProgress
					variant="determinate"
					value={50}
					sx={{
						...progressStyles,
						color: "#eefa46",
					}}
					size={200}
				/>
				<CircularProgress
					variant="determinate"
					value={25}
					sx={{
						...progressStyles,
						color: "#69fa46ff",
					}}
					size={200}
				/>
				<div className={styles.overflow_circle_div}>
					<CircularProgress
						sx={{
							position: "absolute",
							color: "#f76565",
						}}
						variant="determinate"
						value={20}
						size={220}
						thickness={4}
					/>
					<CircularProgress
						sx={{
							position: "absolute",
							color: "#ff0000ff",
						}}
						variant="determinate"
						value={10}
						size={220}
						thickness={4}
					/>
				</div>
				<div className={styles.legend_box}>
					 UNSOLD TICKETS ==> OVERSOLD TICKETS 
					<div className={styles.legend_row} style={{ color: "#9ca1a3ff" }}>
						Unsold Tickets: 000
					</div>
					 NOT CHECKED IN ==> WONT PERFORM, should be an info tooltip, because if there are 20 oversold tickets, but 10 unsold tickets this will still be necessary 
					<div className={styles.legend_row} style={{ color: "#fa8b46ff" }}>
						Not Checked In: 000
					</div>
					<div className={styles.legend_row} style={{ color: "#eefa45ff" }}>
						In Cue: 000
					</div>
					<div className={styles.legend_row} style={{ color: "#51fa46ff" }}>
						Performed: 000
					</div>
				</div>
			</div>
			<div className={styles.stats_small_div}>
				<Divider
					variant="middle"
					sx={{ position: "absolute", top: 0, left: 0, right: 0 }}
				/>
				<div className={styles.stats_small_div_row}>
					<div className={styles.stats_small_div_row_left}>
						average time/performer:
					</div>
					<Divider orientation="vertical" variant="middle" flexItem />
					<div className={styles.stats_small_div_row_right}>mm:ss</div>
				</div>
				<div className={styles.stats_small_div_row}>
					<div className={styles.stats_small_div_row_left}>
						target time/performer:
					</div>
					<Divider orientation="vertical" variant="middle" flexItem />
					<div className={styles.stats_small_div_row_right}>mm:ss</div>
				</div>
			</div>
			<div className={styles.stats_small_div}>
				<Divider
					variant="middle"
					sx={{ position: "absolute", top: 0, left: 0, right: 0 }}
				/>
				<div className={styles.stats_small_div_row}>
					<div className={styles.stats_small_div_row_left}>
						Ahead of time by:
					</div>
					<Divider orientation="vertical" variant="middle" flexItem />
					<div className={styles.stats_small_div_row_right}>mm:ss</div>
				</div>
				<div className={styles.stats_small_div_row}>
					<div className={styles.stats_small_div_row_left}>
						Total Performer Increase:
					</div>
					<Divider orientation="vertical" variant="middle" flexItem />
					<div className={styles.stats_small_div_row_right}>00</div>
				</div>
			</div>
			<div className={styles.stats_small_div}>
				<Divider
					variant="middle"
					sx={{ position: "absolute", top: 0, left: 0, right: 0 }}
				/>
				<div className={styles.stats_small_div_row} style={{ height: "50%" }}>
					<div className={styles.stats_small_div_row_left}>
						performers not submitted audio:
					</div>
					<Divider orientation="vertical" variant="middle" flexItem />
					<div className={styles.stats_small_div_row_right}>00</div>
				</div>
			</div>
		</div>
 */

/* .stats_main_div {
	width: 100vw;
	position: relative;
	height: calc(100vh - 165px);
	composes: column from "@styl/base_flexbox.module.css";
}
.stats_small_div {
	position: relative;
	width: 100%;
	height: 20%;
	composes: column_center from "@styl/base_flexbox.module.css";
}
.stats_small_div_row {
	width: 100%;
	height: 40%;
	composes: row from "@styl/base_flexbox.module.css";
}
.stats_small_div_row_left {
	height: 40%;
	width: 50%;
	composes: row_center from "@styl/base_flexbox.module.css";
	text-align: center;
}
.stats_small_div_row_right {
	composes: row from "@styl/base_flexbox.module.css";
	padding-left: 10px;
}
.stats_large_div {
	position: relative;
	width: 100%;
	height: 40%;
	composes: column_center from "@styl/base_flexbox.module.css";
}
.overflow_circle_div {
	margin-top: 50px;
	composes: row_center from "@styl/base_flexbox.module.css";
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 200;
	transform: scaleX(-1);
}
.legend_box {
	margin-top: 50px;
	composes: column_center from "@styl/base_flexbox.module.css";
	position: absolute;
	height: 100%;
	width: 100%;
}
.legend_row {
	composes: row_center from "@styl/base_flexbox.module.css";
	width: 100%;
	height: 10%;
	color: darkmagenta;
}
.total_performers_div {
	composes: column from "@styl/base_flexbox.module.css";
	position: fixed;
	width: 100%;
	top: 45px;
	left: 0;
	right: 0;
}
.total_performers_text {
	width: 100%;
	composes: row_center from "@styl/base_flexbox.module.css";
	color: var(--primary-main);
} */
