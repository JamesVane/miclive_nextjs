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

interface PerformerTicketAudioSelectModal {
	selectFromSongOpen: number;
	totalAudioLength: number;
	allowedLength: number;
	currentSongLength: number;
	setSelectFromSongOpen: () => void;
	specificEventId: number;
}

function PerformerTicketAudioSelectModal({
	selectFromSongOpen,
	setSelectFromSongOpen,
	totalAudioLength,
	allowedLength,
	currentSongLength,
	specificEventId,
}: PerformerTicketAudioSelectModal) {
	const dispatch = useDispatch();

	const [isLoading, setIsLoading] = useState(true);

	const audioKeysObject = useSelector(
		(state: RootState) => state.performerAudioKeys
	);

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

		PostPerformerChangeSubmittedAudioFromExisting(
			roleIdAsNumber,
			specificEventId,
			{
				[selectFromSongOpen]: {
					audioName: audioKey.name,
					audioKey: `performer_${roleIdAsNumber}/audio_${audioKey.audio_id}`,
					length: timeStringToSeconds(audioKey.audio_length),
				},
			}
		)
			.then((res) => {
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
						{audioKeysObject &&
							audioKeysObject.map((audioKey) => {
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
