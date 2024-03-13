/** @format */

import { useDispatch, useSelector } from "react-redux";
import { resetAddNewAudioToEvent } from "@/store/performerAddNewAudioToEventSlice";
import { RootState } from "@/app/LocalizationProviderHelper";
import PerformerAddAudio from "@mobi/Performer/PerformerAddAudio";

interface PerformerAddNewAudioToEventModalProps {
	refreshAudio: () => void;
	notAModal?: boolean;
}

function PerformerAddNewAudioToEventModal({
	refreshAudio,
	notAModal,
}: PerformerAddNewAudioToEventModalProps) {
	const dispatch = useDispatch();
	const { addNewOpen, specificEventId } = useSelector(
		(state: RootState) => state.performerAddNewAudioToEvent
	);

	function handleClose() {
		refreshAudio();
		dispatch(resetAddNewAudioToEvent());
	}

	return (
		<>
			{addNewOpen ? (
				<PerformerAddAudio
					refreshTickets={refreshAudio}
					close={handleClose}
					forTicket
					specificEventId={specificEventId}
					addNewOpen={addNewOpen}
					notAModal={notAModal}
				/>
			) : null}
		</>
	);
}

export default PerformerAddNewAudioToEventModal;
