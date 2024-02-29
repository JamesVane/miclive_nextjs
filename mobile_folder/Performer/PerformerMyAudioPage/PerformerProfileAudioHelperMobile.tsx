/** @format */

import { RootState } from "@/app/LocalizationProviderHelper";
import { useSelector } from "react-redux";
import PerformerProfileAudioPaperMobile from "./PerformerProfileAudioPaperMobile";
import styles from "./styles.module.css";

function PerformerProfileAudioHelperMobile() {
	const audioKeysObject = useSelector(
		(state: RootState) => state.performerAudioKeys
	);

	return (
		<>
			{audioKeysObject &&
				audioKeysObject.map((audioKey) => {
					return (
						<PerformerProfileAudioPaperMobile
							key={audioKey.audio_id}
							audioKey={audioKey}
						/>
					);
				})}
			<div className={styles.bottom_buffer} />
		</>
	);
}

export default PerformerProfileAudioHelperMobile;
