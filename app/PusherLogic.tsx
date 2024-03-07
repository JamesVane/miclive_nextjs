/** @format */
"use client";

import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { Auth } from "aws-amplify";
import { useDispatch } from "react-redux";
import {
	setImtermissionTimestamp,
	setUpdateDNDFromSocketPromoter,
	setNextPerformer,
	setEventhasStarted as setEventhasStartedPromoter,
	setEventHasEnded as setEventHasEndedPromoter,
	setCuePositionPlusOnePromoter,
} from "@/store/PromoterManageEventState";
import { RootState } from "@/app/LocalizationProviderHelper";
import { useSelector } from "react-redux";

function PusherLogic() {
	const [userType, setUserType] = useState("");
	const [userRoleId, setUserRoleId] = useState("");

	const { specificEventId } = useSelector(
		(state: RootState) => state.currentEventSpecificEventIdSlice
	);

	useEffect(() => {
		async function getUserTypeAndRoleId() {
			const user = await Auth.currentAuthenticatedUser();
			const roleType = user.attributes["custom:RoleType"];
			const userRoleId = user.attributes["custom:RoleId"];
			setUserType(roleType);
			setUserRoleId(userRoleId);
		}
		getUserTypeAndRoleId();
	}, []);

	function PusherInner() {
		const dispatch = useDispatch();
		useEffect(() => {
			const userChannelId = `${userType}_${userRoleId}`;
			const eventChannelId = specificEventId
				? `event_${specificEventId}`
				: "event_0";

			const pusher = new Pusher("7519598870db2d634286", {
				cluster: "us2",
			});
			var userChannel = pusher.subscribe(userChannelId);
			var eventChannel = pusher.subscribe(eventChannelId);

			if (userType === "promoter") {
				if (specificEventId) {
					eventChannel.bind(
						"event_queue_position_dragged_and_dropped",
						function (data: any) {
							const responseArray = data.response_array;
							dispatch(setUpdateDNDFromSocketPromoter(responseArray));
						}
					);
				}
				userChannel.bind("current_event_start_stop", function (data: any) {
					const hasStarted = data.status === "started";
					const hasEnded = data.status === "ended";
					if (hasStarted) {
						dispatch(setEventhasStartedPromoter(true));
					}
				});

				userChannel.bind("intermission_start", function (data: any) {
					const intermissionTimestamp = data.timestamp;
					dispatch(setImtermissionTimestamp(intermissionTimestamp));
				});

				userChannel.bind("intermission_has_been_edited", function (data: any) {
					const newTimestamp = data.request_timestamp;
					dispatch(setImtermissionTimestamp(newTimestamp));
				});

				userChannel.bind("dj_ended_intermission", function (data: any) {
					dispatch(setImtermissionTimestamp(null));
					dispatch(setCuePositionPlusOnePromoter());
				});

				userChannel.bind("event_mived_to_next_performer", function (data: any) {
					const newQueuePosition = data.new_queue_position;
					dispatch(setNextPerformer(newQueuePosition));
				});

				userChannel.bind("dj_ended_event", function (data: any) {
					const specificEventId = data.specific_event_id;
					dispatch(setEventHasEndedPromoter(true));
				});
			}

			return () => {
				pusher.unsubscribe(userChannelId);
				pusher.unsubscribe(eventChannelId);
				pusher.disconnect();
			};
		}, [specificEventId]);
		return <></>;
	}

	return (
		<>
			{userType && userType !== "" && userRoleId && userRoleId !== "" ? (
				<PusherInner />
			) : (
				<></>
			)}
		</>
	);
}

export default PusherLogic;
