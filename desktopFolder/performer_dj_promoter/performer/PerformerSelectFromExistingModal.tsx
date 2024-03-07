/** @format */

import { MouseEvent } from "react";
import { Paper } from "@mui/material";
import PerformerTicketAudioSelectModal from "./PerformerTicketAudioComponent/PerformerTicketAudioSelectModal";
import { useDispatch, useSelector } from "react-redux";
import {
	setSelectFromExisting,
	defaultPerformerSelectFromExistingModal,
} from "@/store/performerSelectFromExistingModalSlice";
import { RootState } from "@/app/LocalizationProviderHelper";
import { PerformerRoleAudioKeys } from "@/api_functions/getPerformerProfileAudioKeys";

interface PerformerSelectFromExistingModalProps {
	refreshAudio: () => void;
	performerIdFromInput?: number;
	audioKeysFromInput?: PerformerRoleAudioKeys;
	djRoleIdForPerformerSocket?: string;
}

function PerformerSelectFromExistingModal({
	refreshAudio,
	performerIdFromInput,
	audioKeysFromInput,
	djRoleIdForPerformerSocket,
}: PerformerSelectFromExistingModalProps) {
	const dispatch = useDispatch();
	const {
		selectFromSongOpen,
		specificEventId,
		currentSongLength,
		totalAudioLength,
		allowedLength,
	} = useSelector((state: RootState) => state.performerSelectFromExistingModal);

	function handleClose() {
		dispatch(setSelectFromExisting(defaultPerformerSelectFromExistingModal));
		refreshAudio();
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
			{selectFromSongOpen !== 0 ? (
				<div
					onClick={handleClickOutside}
					style={{
						width: "100%",
						height: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						position: "absolute",
						zIndex: "5000",
						backgroundColor: "rgba(0,0,0,0.5)",
					}}>
					<Paper
						sx={{ width: "450px", height: "700px", overflow: "hidden" }}
						onClick={handleClickInside}>
						<PerformerTicketAudioSelectModal
							audioKeysFromInput={audioKeysFromInput}
							specificEventId={specificEventId}
							currentSongLength={currentSongLength}
							totalAudioLength={totalAudioLength}
							setSelectFromSongOpen={handleClose}
							selectFromSongOpen={selectFromSongOpen}
							allowedLength={allowedLength}
							performerIdFromInput={performerIdFromInput}
							djRoleIdForPerformerSocket={djRoleIdForPerformerSocket}
						/>
					</Paper>
				</div>
			) : null}
		</>
	);
}

export default PerformerSelectFromExistingModal;
