/** @format */

import { useState } from "react";
import styles from "./styles.module.css";
import InQueuePaper from "./InQueuePaper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/LocalizationProviderHelper";
import { PromoterCueObjectType } from "@/store/PromoterManageEventState";
import { putChangePerformerQueuePositionForDND } from "@/api_functions/putChangePerformerQueuePositionForDND";
import { DragDropContext, Draggable } from "react-beautiful-dnd";
import { CircularProgress } from "@mui/material";
import { StrictModeDroppable } from "@/StrictModeDroppable";

interface InQueueHelperProps {
	setChangeAudioModal: React.Dispatch<
		React.SetStateAction<{
			performerId: number;
			performerName: string;
		}>
	>;
}

function InQueueHelper({ setChangeAudioModal }: InQueueHelperProps) {
	const dispatch = useDispatch();

	const {
		event: eventObject,
		roster: rosterObject,
		event_cue_position: eventQueuePosition,
	} = useSelector((state: RootState) => state.PromoterManageEventState);
	const specificEventId = eventObject.specific_event_id;
	const checkedInObjects = rosterObject.checked_in;

	const arrayOfCuePositions = Object.entries(checkedInObjects).map(
		(performer) => performer[1].cue_position
	);

	const [isLoading, setIsLoading] = useState(false);

	const handleDrop = async (droppedItem: any) => {
		console.log("droppedItem", droppedItem);
		if (!droppedItem.destination) return;
		setIsLoading(true);
		var updatedList = [...arrayOfCuePositions];

		const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);

		updatedList.splice(droppedItem.destination.index, 0, reorderedItem);

		let returnObject: PromoterCueObjectType = {};
		for (let i = 0; i < updatedList.length; i++) {
			let keyCuePosition = arrayOfCuePositions[i];
			let returnedObject = {
				...checkedInObjects[updatedList[i]],
				cue_position: keyCuePosition,
			};
			returnObject[keyCuePosition] = returnedObject;
		}
		const postArray = Object.entries(returnObject).map((performer) => {
			const hasChanged =
				checkedInObjects[performer[1].cue_position].performer_id !=
				performer[1].performer_id;
			return {
				request_performer_role_id: performer[1].performer_id,
				request_cue_position: performer[1].cue_position,
				request_performer_phone_number: hasChanged
					? performer[1].performer_account_phone_number
					: "NO CHANGE",
				request_sms_message: hasChanged
					? `[Mic.Live] The queue have been changed by the Event Manager. There are now ${
							eventQueuePosition === 0
								? performer[1].cue_position - 1
								: performer[1].cue_position - eventQueuePosition
					  } performers in front of you.`
					: "NO CHANGE",
			};
		});
		const postSuccessBool = await putChangePerformerQueuePositionForDND({
			requestSpecificEventId: specificEventId.toString(),
			performerQueuePositions: postArray,
		});
		setIsLoading(false);
	};

	const mappedPapers = arrayOfCuePositions.map((item, index) => {
		let returnObject = checkedInObjects[item];
		if (returnObject.cue_position !== eventQueuePosition) {
			return (
				<Draggable
					key={returnObject.performer_id}
					draggableId={returnObject.performer_id.toString()}
					index={index}>
					{(provided, snapshot) => (
						<div
							className={styles.dnd_center}
							ref={provided.innerRef}
							{...provided.dragHandleProps}
							{...provided.draggableProps}>
							<InQueuePaper
								setChangeAudioModal={setChangeAudioModal}
								queuePosition={returnObject.cue_position}
								performerName={returnObject.performer_name}
								isTempAccount={returnObject.is_temp_account}
								performerId={returnObject.performer_id}
								isDragging={snapshot.isDragging}
							/>
						</div>
					)}
				</Draggable>
			);
		}
	});

	const mappedPapersEmpty = mappedPapers.length == 0;

	return (
		<>
			{isLoading ? (
				<div className={styles.list_loading_overlay}>
					<CircularProgress
						sx={{ marginTop: "-140px" }}
						size={160}
						thickness={1}
					/>
				</div>
			) : null}
			<div className={styles.roster_main_div}>
				{mappedPapersEmpty ? (
					<div className={styles.no_performers_styles}>
						No performers in queue
					</div>
				) : (
					<DragDropContext onDragEnd={handleDrop}>
						<StrictModeDroppable droppableId="list-container">
							{(provided) => (
								<div
									className={styles.dnd_center}
									{...provided.droppableProps}
									ref={provided.innerRef}>
									{mappedPapers}
									{provided.placeholder}
								</div>
							)}
						</StrictModeDroppable>
					</DragDropContext>
				)}
			</div>
		</>
	);
}

export default InQueueHelper;
