/** @format */

import { MouseEvent } from "react";
import { Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetAddNewAudioToEvent } from "@/store/performerAddNewAudioToEventSlice";
import { RootState } from "@/store/rootStore";
import UploadAudio from "@/audioComponents/UploadAudio";

interface PerformerSelectFromExistingModalProps {
	refreshAudio: () => void;
	performerIdFromProps?: number;
}

function PerformerAddNewAudioToEventModal({
	refreshAudio,
	performerIdFromProps,
}: PerformerSelectFromExistingModalProps) {
	const dispatch = useDispatch();
	const { addNewOpen, specificEventId } = useSelector(
		(state: RootState) => state.performerAddNewAudioToEvent
	);

	function handleClose() {
		refreshAudio();
		dispatch(resetAddNewAudioToEvent());
	}

	function handleClickOutside(event: MouseEvent) {
		event.stopPropagation();
		handleClose();
	}

	function handleClickInside(event: MouseEvent) {
		event.stopPropagation();
	}

	return (
		<>
			{addNewOpen !== 0 ? (
				<div
					onClick={handleClickOutside}
					style={{
						width: "100vw",
						height: "100vh",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						position: "fixed",
						bottom: 0,
						left: 0,
						right: 0,
						zIndex: "1000",
						backgroundColor: "rgba(0,0,0,0.5)",
					}}>
					<Paper
						sx={{
							width: "450px",
							height: "700px",
							overflow: "hidden",
							position: "relative",
						}}
						onClick={handleClickInside}>
						<UploadAudio
							close={handleClose}
							forTicket
							specificEventId={specificEventId}
							addNewOpen={addNewOpen}
							performerIdFromProps={performerIdFromProps}
						/>
					</Paper>
				</div>
			) : null}
		</>
	);
}

export default PerformerAddNewAudioToEventModal;
