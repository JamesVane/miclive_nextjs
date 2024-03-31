/** @format */

import React from "react";
import { RootState } from "@/app/LocalizationProviderHelper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { getPerformerProfileAudioKeys } from "@/api_functions_need_to_add_auth/getPerformerProfileAudioKeys";
import { setPerformerAudioKey } from "@/store/performerAudioKeysStore";
import { PostPerformerChangeSubmittedAudioFromExisting } from "@/api_functions_need_to_add_auth/PostPerformerChangeSubmittedAudioFromExisting";
import { timeStringToSeconds } from "@/generic_functions/time_formaters";
import { Button, Divider } from "@mui/material";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import styles from "./styles.module.css";
import { Triangle } from "react-loader-spinner";
import PerformerTicketAudioSelectRowMobile from "./PerformerTicketAudioSelectRowMobile";

interface PerformerTicketAudioSelectModalMobileProps {
	selectFromSongOpen: number;
	totalAudioLength: number;
	allowedLength: number;
	currentSongLength: number;
	setSelectFromSongOpen: () => void;
	specificEventId: number;
}

function PerformerTicketAudioSelectModalMobile({
	selectFromSongOpen,
	setSelectFromSongOpen,
	totalAudioLength,
	allowedLength,
	currentSongLength,
	specificEventId,
}: PerformerTicketAudioSelectModalMobileProps) {
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
		setIsLoading(true);
		const currentUser = await Auth.currentAuthenticatedUser();
		const requestPerformerRoleId = currentUser.attributes["custom:RoleId"];
		const roleIdAsString: string =
			typeof requestPerformerRoleId === "string"
				? requestPerformerRoleId
				: requestPerformerRoleId.toString();
		const performerAudioKeys = await getPerformerProfileAudioKeys(
			roleIdAsString
		);
		dispatch(setPerformerAudioKey(performerAudioKeys));
		setIsLoading(false);
	}

	useEffect(() => {
		initAudioKeys();
	}, []);

	return (
		<div className={styles.modal_wrap}>
			<div className={styles.select_from_existing_header}>
				Select Song
				<Button
					startIcon={<ArrowBackIosNewRounded />}
					size="large"
					sx={{
						position: "absolute",
						left: "0px",
					}}
					color="secondary"
					onClick={() => setSelectFromSongOpen()}>
					back
				</Button>
			</div>
			<div className={styles.divider_div}>
				<Divider variant="middle" flexItem />
			</div>
			{isLoading ? (
				<div className={styles.loader_div}>
					<Triangle color="#888661" height={100} width={100} />
				</div>
			) : (
				<div className={styles.audio_rows_scroll}>
					{audioKeysObject &&
						audioKeysObject.map((audioKey) => {
							return (
								<PerformerTicketAudioSelectRowMobile
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
			)}
		</div>
	);
}

export default PerformerTicketAudioSelectModalMobile;
