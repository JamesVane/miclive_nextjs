/** @format */

import { Button } from "@mui/material";
import { ChangeCircleRounded } from "@mui/icons-material";
import styles from "./styles.module.css";

interface BothBannersSelectedProps {
	threeDisplay: string;
	fourDisplay: string;
	selectDifferentHandle: () => void;
	fileName: string;
	isUploading: boolean;
}

function BothBannersSelected({
	threeDisplay,
	fourDisplay,
	selectDifferentHandle,
	fileName,
	isUploading,
}: BothBannersSelectedProps) {
	return (
		<div className={styles.selected_banners_end}>
			<div className={styles.banner_file_name}>
				<div className={styles.elipse_text}>{fileName}</div>
			</div>
			<Button
				disabled={isUploading}
				onClick={selectDifferentHandle}
				variant="outlined"
				startIcon={<ChangeCircleRounded />}
				size="large"
				sx={{ marginBottom: "20px" }}>
				Select Different Image
			</Button>
			<div className={styles.both_selected_dimension_text}>3 X 1</div>
			<div className={styles.banner_row_help}>
				<div className={styles.three_confirm_pic}>
					<img
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
						src={threeDisplay}
						alt="Cropped"
					/>
				</div>
			</div>
			<div className={styles.both_selected_dimension_text}>4 X 1</div>
			<div className={styles.banner_row_help}>
				<div className={styles.four_confirm_pic}>
					<img
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
						src={fourDisplay}
						alt="Cropped"
					/>
				</div>
			</div>
		</div>
	);
}

export default BothBannersSelected;
