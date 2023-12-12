/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Button, IconButton, LinearProgress } from "@mui/material";
import { CancelPresentationRounded, CloseRounded } from "@mui/icons-material";
import DividerH from "@/universalComponents/DividerH";

interface DropDateModalMobileProps {
	handleCloseModal: () => void;
	handleDropDate: () => void;
	isDroppingOrResigning: boolean;
}

function DropDateModalMobile({
	handleCloseModal,
	handleDropDate,
	isDroppingOrResigning,
}: DropDateModalMobileProps) {
	return (
		<div
			className={styles.confirm_resign_main}
			onClick={isDroppingOrResigning ? () => {} : handleCloseModal}>
			<div
				className={styles.confirm_resign_paper}
				onClick={(e) => e.stopPropagation()}>
				<IconButton
					color="secondary"
					onClick={isDroppingOrResigning ? () => {} : handleCloseModal}
					sx={{
						position: "absolute",
						top: "0px",
						right: "0px",
						height: "40px",
						width: "40px",
					}}>
					<CloseRounded sx={{ height: "35px", width: "35px" }} />
				</IconButton>
				<div className={styles.confirm_resign_top}>Drop Event Date?</div>
				<DividerH />
				<div className={styles.confirm_resign_buttons}>
					<Button
						disabled={isDroppingOrResigning}
						onClick={handleCloseModal}
						color="secondary"
						startIcon={<CloseRounded />}
						sx={{ marginRight: "5px" }}
						variant="outlined"
						size="large">
						{" "}
						cancel
					</Button>
					<Button
						disabled={isDroppingOrResigning}
						sx={{ position: "relative", overflow: "hidden", marginLeft: "5px" }}
						onClick={handleDropDate}
						color="warning"
						startIcon={<CancelPresentationRounded />}
						variant="outlined"
						size="large">
						{isDroppingOrResigning ? (
							<LinearProgress
								color="warning"
								sx={{ width: "100%", position: "absolute", bottom: "0px" }}
							/>
						) : null}
						resign
					</Button>
				</div>
			</div>
		</div>
	);
}

export default DropDateModalMobile;
