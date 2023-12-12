/** @format */

import { Button } from "@mui/material";
import { MessageRounded } from "@mui/icons-material";
import { useState } from "react";
import { RootState } from "@/store/rootStore";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles.module.css";
import _ from "lodash";
import AvatarSimple from "@desk/AvatarSimple";
import SubmittedAudioChip from "../../SubmittedAudioChip";
import DividerH from "@/universalComponents/DividerH";

interface Props {
	displayPosition: number;
	performerCue: number;
}

function PerformerInPerformedCueComponent({
	displayPosition,
	performerCue,
}: Props) {
	const dispatch = useDispatch();
	const [audioState, setAudioState] = useState<
		"not downloaded" | "changed" | "downloaded"
	>("not downloaded");
	const { has_performed } = useSelector(
		(state: RootState) => state.djManageEvent
	);
	const performerObject = has_performed[performerCue];

	const hasAudio =
		Object.keys(performerObject.submitted_audio).length === 0 ? false : true;

	return (
		<>
			{performerObject.performer_name === "" ? null : (
				<>
					<div className={styles.roster_person_div}>
						<div className={styles.person_pic_div}>
							<AvatarSimple
								ninety
								type="performer"
								id={performerObject.performer_id}
							/>
						</div>
						<div className={styles.person_row_middle}>
							<div className={styles.performer_name}>
								{performerObject.performer_name}
							</div>
							<div className={styles.performer_buttons}>
								<Button startIcon={<MessageRounded />} variant="outlined">
									message
								</Button>
								<SubmittedAudioChip hasAudio={hasAudio} />
								<div className={styles.time_used_div}>
									Time Used:
									<div className={styles.time_used_clock_deco}>00:00</div>
								</div>
							</div>
						</div>
						<div className={styles.person_row_right}>
							<div className={styles.queue_pos_deco}>
								{performerObject.cue_position}
							</div>
						</div>
					</div>
					<DividerH />
				</>
			)}
		</>
	);
}

export default PerformerInPerformedCueComponent;
