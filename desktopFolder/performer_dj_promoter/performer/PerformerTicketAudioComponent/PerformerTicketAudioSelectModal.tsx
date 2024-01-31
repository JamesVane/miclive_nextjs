/** @format */

import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { PostPerformerChangeSubmittedAudioFromExisting } from "@/api_functions/PostPerformerChangeSubmittedAudioFromExisting";
import { RootState } from "@/store/rootStore";
import { useDispatch, useSelector } from "react-redux";
import PerformerTicketAudioSelectRow from "./PerformerTicketAudioSelectRow";
import { timeStringToSeconds } from "@/generic_functions/time_formaters";
import { IconButton } from "@mui/material";
import { CloseRounded } from "@mui/icons-material";
import { Auth } from "aws-amplify";
import SplashPage from "@/SplashPage";
import { getPerformerProfileAudioKeys } from "@/api_functions/getPerformerProfileAudioKeys";
import { setPerformerAudioKey } from "@/store/performerAudioKeysStore";
import { postSocketPerformerChangedAudioForCurrentEventToDj } from "@/api_functions/postSocketPerformerChangedAudioForCurrentEventToDj";
import { PerformerRoleAudioKeys } from "@/api_functions/getPerformerProfileAudioKeys";

interface PerformerTicketAudioSelectModal {
	selectFromSongOpen: number;
	totalAudioLength: number;
	allowedLength: number;
	currentSongLength: number;
	setSelectFromSongOpen: () => void;
	specificEventId: number;
	performerIdFromInput?: number;
	audioKeysFromInput?: PerformerRoleAudioKeys;
	djSubForPromotersocket?: string;
}

function PerformerTicketAudioSelectModal({
	selectFromSongOpen,
	setSelectFromSongOpen,
	totalAudioLength,
	allowedLength,
	currentSongLength,
	specificEventId,
	performerIdFromInput,
	audioKeysFromInput,
	djSubForPromotersocket,
}: PerformerTicketAudioSelectModal) {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);

	const audioKeysObject = useSelector(
		(state: RootState) => state.performerAudioKeys
	);
	const audioKeysToUse = audioKeysFromInput
		? audioKeysFromInput
		: audioKeysObject;

	async function selectExistingAudio(audioKey: {
		audio_id: number;
		name: string;
		audio_length: string;
		performer_id: number;
	}) {
		const currentUser = await Auth.currentAuthenticatedUser();
		const requestPerformerRoleId = currentUser.attributes["custom:RoleId"];
		const roleIdAsNumber: number =
			typeof requestPerformerRoleId === "string"
				? parseInt(requestPerformerRoleId)
				: requestPerformerRoleId;

		const performerIdToBeUsed = performerIdFromInput
			? performerIdFromInput
			: roleIdAsNumber;

		const bodyForAudio = {
			audioName: audioKey.name,
			audioKey: `performer_${performerIdToBeUsed}/audio_${audioKey.audio_id}`,
			length: timeStringToSeconds(audioKey.audio_length),
		};

		PostPerformerChangeSubmittedAudioFromExisting(
			performerIdToBeUsed,
			specificEventId,
			{
				[selectFromSongOpen]: bodyForAudio,
			}
		)
			.then((res) => {
				if (djSubForPromotersocket) {
					postSocketPerformerChangedAudioForCurrentEventToDj({
						request_dj_sub: djSubForPromotersocket,
						request_performer_id: performerIdToBeUsed.toString(),
						request_specific_event_id: specificEventId.toString(),
						request_audio_key: selectFromSongOpen.toString(),
						request_audio_value: bodyForAudio,
					});
				}
				setSelectFromSongOpen();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	async function initAudioKeys() {
		const currentUser = await Auth.currentAuthenticatedUser();
		const requestPerformerRoleId = currentUser.attributes["custom:RoleId"];
		const roleIdAsString: string =
			typeof requestPerformerRoleId === "string"
				? requestPerformerRoleId
				: requestPerformerRoleId.toString();
		getPerformerProfileAudioKeys(roleIdAsString).then((res) => {
			dispatch(setPerformerAudioKey(res));
		});
	}

	useEffect(() => {
		initAudioKeys().then(() => setIsLoading(false));
	}, []);

	return (
		<div className={styles.modal_wrap}>
			{isLoading ? (
				<SplashPage />
			) : (
				<>
					<div className={styles.select_from_existing_header}>
						Select Song
						<IconButton
							onClick={() => setSelectFromSongOpen()}
							sx={{
								position: "absolute",
								right: "0px",
								top: "0px",
								height: "40px",
								width: "40px",
							}}>
							<CloseRounded sx={{ height: "35px", width: "35px" }} />
						</IconButton>
					</div>
					<div className={styles.audio_rows_scroll}>
						{audioKeysToUse &&
							audioKeysToUse.map((audioKey) => {
								return (
									<PerformerTicketAudioSelectRow
										isTooLong={
											allowedLength <
											totalAudioLength -
												currentSongLength +
												timeStringToSeconds(audioKey.audio_length)
												? true
												: false
										}
										selectExistingAudio={selectExistingAudio}
										key={audioKey.audio_id}
										audioKey={audioKey}
									/>
								);
							})}
					</div>
				</>
			)}
		</div>
	);
}

export default PerformerTicketAudioSelectModal;
