/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Divider, Button, IconButton, LinearProgress } from "@mui/material";
import { CancelPresentationRounded, CloseRounded } from "@mui/icons-material";

interface ResignAsDjModalProps {
	handleCloseModal: () => void;
	handleResignAsDj: () => void;
	isDroppingOrResigning: boolean;
}

function ResignAsDjModal({
	handleCloseModal,
	handleResignAsDj,
	isDroppingOrResigning,
}: ResignAsDjModalProps) {
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
				<div className={styles.confirm_resign_top}>Resign As Event DJ?</div>
				<div className={styles.divider_div}>
					<Divider variant="middle" flexItem />
				</div>
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
						onClick={handleResignAsDj}
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

export default ResignAsDjModal;
