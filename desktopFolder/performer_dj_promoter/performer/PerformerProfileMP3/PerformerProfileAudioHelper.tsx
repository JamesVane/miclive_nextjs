/** @format */

import { useSelector } from "react-redux";
import PerformerProfileAudioPaper from "./PerformerProfileAudioPaper";
import { RootState } from "@/app/LocalizationProviderHelper";

function PerformerProfileAudioHelper() {
	const audioKeysObject = useSelector(
		(state: RootState) => state.performerAudioKeys
	);

	return (
		<>
			{audioKeysObject &&
				audioKeysObject.map((audioKey) => {
					return (
						<PerformerProfileAudioPaper
							key={audioKey.audio_id}
							audioKey={audioKey}
						/>
					);
				})}
		</>
	);
}

export default PerformerProfileAudioHelper;
