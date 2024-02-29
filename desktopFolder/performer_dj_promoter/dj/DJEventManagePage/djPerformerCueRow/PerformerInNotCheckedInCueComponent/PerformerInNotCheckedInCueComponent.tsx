/** @format */

import { Button } from "@mui/material";
import { MessageRounded } from "@mui/icons-material";
import { useState } from "react";
import { RootState } from "@/app/LocalizationProviderHelper";
import { useSelector, useDispatch } from "react-redux";
import styles from "../styles.module.css";
import _ from "lodash";
import AvatarSimple from "@desk/AvatarSimple";
import SubmittedAudioChip from "../../SubmittedAudioChip";
import DividerH from "@/universalComponents/DividerH";

interface Props {
	arrayPosition: number;
}

function PerformerInNotCheckedInCueComponent({ arrayPosition }: Props) {
	const dispatch = useDispatch();
	const [audioState, setAudioState] = useState<
		"not downloaded" | "changed" | "downloaded"
	>("not downloaded");
	const { not_checked_in } = useSelector(
		(state: RootState) => state.djManageEvent
	);
	const performerObject = not_checked_in[arrayPosition];

	const hasAudio =
		Object.keys(performerObject.submitted_audio).length === 0 ? false : true;

	return (
		<>
			{arrayPosition === 0 ? null : (
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
							</div>
						</div>
						<div className={styles.person_row_right}></div>
					</div>
					<DividerH />
				</>
			)}
		</>
	);
}

export default PerformerInNotCheckedInCueComponent;
