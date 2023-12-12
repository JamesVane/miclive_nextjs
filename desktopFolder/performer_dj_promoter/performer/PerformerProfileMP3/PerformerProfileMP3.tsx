/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import PerformerProfileAudioHelper from "./PerformerProfileAudioHelper";
import UploadAudio from "@/audioComponents/UploadAudio";
import { AddRounded } from "@mui/icons-material";

function PerformerProfileMP3() {
	const [addingAudio, setAddingAudio] = useState(false);

	return (
		<div className={styles.main_wrapper}>
			<div className={styles.inner_wrapper}>
				{addingAudio ? (
					<UploadAudio close={() => setAddingAudio(false)} />
				) : null}
				<div className={styles.top_button_div}>
					<Button
						onClick={() => setAddingAudio(true)}
						startIcon={<AddRounded style={{ height: "35px", width: "35px" }} />}
						sx={{
							height: "calc(100% - 10px)",
							width: "calc(100% - 10px)",
							fontSize: "22px",
						}}
						color="success"
						variant="outlined">
						add audio
					</Button>
				</div>
				<div className={styles.helper_wrapper}>
					<PerformerProfileAudioHelper />
				</div>
			</div>
		</div>
	);
}

export default PerformerProfileMP3;
