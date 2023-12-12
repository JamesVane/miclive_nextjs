/** @format */

import { useDispatch, useSelector } from "react-redux";
import { resetAddNewAudioToEvent } from "@/store/performerAddNewAudioToEventSlice";
import { RootState } from "@/store/rootStore";
import PerformerAddAudio from "@mobi/Performer/PerformerAddAudio";

interface PerformerAddNewAudioToEventModalProps {
	refreshAudio: () => void;
}

function PerformerAddNewAudioToEventModal({
	refreshAudio,
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
				/>
			) : null}
		</>
	);
}

export default PerformerAddNewAudioToEventModal;
