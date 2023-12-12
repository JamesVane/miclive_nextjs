/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import { Button } from "@mui/material";
import PerformerProfileAudioHelperMobile from "./PerformerProfileAudioHelperMobile";
import PerformerAddAudio from "../PerformerAddAudio";
import { AddRounded } from "@mui/icons-material";

function PerformerMyAudioPage() {
	const [addingAudio, setAddingAudio] = useState(false);

	return (
		<>
			{addingAudio ? (
				<PerformerAddAudio close={() => setAddingAudio(false)} />
			) : null}
			<div className={styles.inner_wrapper}>
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
					<PerformerProfileAudioHelperMobile />
				</div>
			</div>
		</>
	);
}

export default PerformerMyAudioPage;
