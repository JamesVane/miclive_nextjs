/** @format */

import styles from "./styles.module.css";
import { Button, LinearProgress } from "@mui/material";
import { ChangeCircleRounded, CheckRounded } from "@mui/icons-material";

interface EditEventBannerBothSelectedProps {
	threeDisplay: string;
	fourDisplay: string;
	selectDifferentHandle: () => void;
	fileName: string;
	isUploading: boolean;
	handleUploadBanner: () => void;
}

function EditEventBannerBothSelected({
	threeDisplay,
	fourDisplay,
	selectDifferentHandle,
	fileName,
	isUploading,
	handleUploadBanner,
}: EditEventBannerBothSelectedProps) {
	return (
		<div className={styles.selected_banners_end}>
			<div className={styles.banner_file_name}>
				<div className={styles.elipses_text}>{fileName}</div>
			</div>
			<Button
				onClick={selectDifferentHandle}
				variant="outlined"
				startIcon={<ChangeCircleRounded />}
				size="large"
				sx={{ marginBottom: "20px" }}>
				Select Different Image
			</Button>
			<div className={styles.dims_row_div}>3 X 1</div>
			<div className={styles.banner_row_help}>
				<div className={styles.three_confirm_pic}>
					<img
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
						src={threeDisplay}
						alt="Cropped"
					/>
				</div>
			</div>
			<div className={styles.dims_row_div}>4 X 1</div>
			<div className={styles.banner_row_help}>
				<div className={styles.four_confirm_pic}>
					<img
						style={{ width: "100%", height: "100%", objectFit: "cover" }}
						src={fourDisplay}
						alt="Cropped"
					/>
				</div>
			</div>
			<Button
				onClick={handleUploadBanner}
				disabled={isUploading}
				sx={{ marginTop: "15px", position: "relative", overflow: "hidden" }}
				variant="outlined"
				color="success"
				size="large"
				startIcon={<CheckRounded />}>
				save banner
				{isUploading ? (
					<LinearProgress
						color="success"
						sx={{ position: "absolute", bottom: "0px", width: "100%" }}
					/>
				) : null}
			</Button>
		</div>
	);
}

export default EditEventBannerBothSelected;
