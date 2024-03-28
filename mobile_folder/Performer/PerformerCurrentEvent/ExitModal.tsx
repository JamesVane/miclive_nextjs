/** @format */

import React from "react";
import styles from "./styles.module.css";
import { Paper, IconButton, Button } from "@mui/material";
import { CloseRounded, ExitToAppRounded } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import DividerH from "@/universalComponents/DividerH";

interface ExitModalProps {
	cancelExit: () => void;
}

function ExitModal({ cancelExit }: ExitModalProps) {
	const router = useRouter();

	function handleExit() {
		router.push("/performer");
	}

	function paperPreventDefault(e: any) {
		e.preventDefault();
		e.stopPropagation();
	}

	return (
		<div className={styles.exit_modal_div} onClick={cancelExit}>
			<Paper className={styles.exit_modal_paper} onClick={paperPreventDefault}>
				<IconButton
					color="secondary"
					sx={{
						position: "absolute",
						right: "2px",
						top: "2px",
						height: "35px",
						width: "35px",
					}}
					onClick={cancelExit}>
					<CloseRounded sx={{ height: "30px", width: "30px" }} />
				</IconButton>
				Exit Current Event Page?
				<DividerH />
				<div className={styles.exit_buttons}>
					<Button
						onClick={cancelExit}
						size="large"
						variant="outlined"
						sx={{ marginRight: "10px" }}
						startIcon={<CloseRounded />}>
						cancel
					</Button>
					<Button
						onClick={handleExit}
						size="large"
						color="error"
						sx={{ marginLeft: "10px" }}
						startIcon={<ExitToAppRounded />}
						variant="outlined">
						exit
					</Button>
				</div>
			</Paper>
		</div>
	);
}

export default ExitModal;
