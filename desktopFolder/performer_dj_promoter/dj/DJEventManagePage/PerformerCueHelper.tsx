/** @format */

import { CueObjectType, CueArraytype } from "@/store/djManageEventSlice";
import PerformerInCheckedInCueComponent from "./djPerformerCueRow/PerformerInCheckedInCueComponent";
import PerformerInPerformedCueComponent from "./djPerformerCueRow/PerformerInPerformedCueComponent";
import PerformerInNotCheckedInCueComponent from "./djPerformerCueRow/PerformerInNotCheckedInCueComponent";
import _ from "lodash";

interface PerformerCueHelper {
	checked_in: CueObjectType;
	not_checked_in: CueArraytype;
	has_performed: CueObjectType;
	cueType: string;
	nextPerformerLoading: boolean;
	swappingInProgress: boolean;
	setSwappingInProgress: React.Dispatch<React.SetStateAction<boolean>>;
}

function PerformerCueHelper({
	checked_in,
	not_checked_in,
	has_performed,
	cueType,
	nextPerformerLoading,
	swappingInProgress,
	setSwappingInProgress,
}: PerformerCueHelper) {
	const sortedCheckedIn = Object.values(checked_in).sort(
		(a, b) => a.cue_position - b.cue_position
	);
	const sortedHasPerformer = Object.values(has_performed).sort(
		(a, b) => a.cue_position - b.cue_position
	);
	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}>
			{cueType === "queue" ? (
				checked_in ? (
					sortedCheckedIn.map((performerObject, index) => (
						<PerformerInCheckedInCueComponent
							swappingInProgress={swappingInProgress}
							setSwappingInProgress={setSwappingInProgress}
							nextPerformerLoading={nextPerformerLoading}
							key={performerObject.performer_name}
							displayPosition={index}
							performerCue={performerObject.cue_position}
							isLast={index === sortedCheckedIn.length - 1 ? true : false}
						/>
					))
				) : (
					<div>There are no performers checked in</div>
				)
			) : cueType === "has performed" ? (
				has_performed ? (
					sortedHasPerformer
						.reverse()
						.map((performerObject, index) => (
							<PerformerInPerformedCueComponent
								key={index}
								displayPosition={index + 1}
								performerCue={performerObject.cue_position}
							/>
						))
				) : (
					<div>There are no performers who have performed</div>
				)
			) : not_checked_in ? (
				not_checked_in.map((performerObject, index) => (
					<PerformerInNotCheckedInCueComponent
						key={index}
						arrayPosition={Number(index)}
					/>
				))
			) : (
				<div>There are no performers who have not checked in</div>
			)}
			<div style={{ width: "100%", height: "48px" }} />
		</div>
	);
}

export default PerformerCueHelper;
