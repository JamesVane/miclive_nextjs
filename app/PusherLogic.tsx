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
import { useQuery } from "@tanstack/react-query";
import { getPerformerCurrentEventState } from "@/api_functions/getPerformerCurrentEventState";
import { getIntermissionStampFromSpecificId } from "@/api_functions/getIntermissionStampFromSpecificId";

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

	function PusherInnerPerformer() {
		const { data: eventInfo, refetch: refetchPerformerCurrentEvent } = useQuery(
			{
				queryKey: [
					"performerCurrentEventState",
					{
						request_specific_event_id: Number(specificEventId),
					},
				],
				queryFn: getPerformerCurrentEventState,
			}
		);
		const { data: imtermissionTimestampFromQuery, refetch: timestampRefetch } =
			useQuery({
				queryKey: [
					"performerCurrentEventTimestamp",
					{
						request_specific_event_id: specificEventId,
					},
				],
				queryFn: getIntermissionStampFromSpecificId,
			});
		useEffect(() => {
			const eventChannelId = specificEventId
				? `event_${specificEventId}`
				: "event_0";

			const pusher = new Pusher("7519598870db2d634286", {
				cluster: "us2",
			});
			var eventChannel = pusher.subscribe(eventChannelId);

			if (userType === "performer") {
				if (specificEventId) {
					eventChannel.bind("event_has_started", function (data: any) {
						refetchPerformerCurrentEvent();
					});

					eventChannel.bind("event_intermission_started", function (data: any) {
						timestampRefetch();
					});

					eventChannel.bind(
						"event_adjust_intermission_time",
						function (data: any) {
							timestampRefetch();
						}
					);

					eventChannel.bind("event_end_intermission", function (data: any) {
						console.log("intermission ended socket");
						timestampRefetch();
						refetchPerformerCurrentEvent();
					});

					eventChannel.bind("event_next_performer", function (data: any) {
						console.log("next performer socket");
						refetchPerformerCurrentEvent();
					});

					eventChannel.bind(
						"event_queue_position_dragged_and_dropped",
						function (data: any) {
							console.log("drag and drop socket");
							refetchPerformerCurrentEvent();
						}
					);

					eventChannel.bind("event_ended", function (data: any) {
						console.log("event ended ");
						refetchPerformerCurrentEvent();
					});

					eventChannel.bind("performer_added_to_roster", function (data: any) {
						console.log("performer added socket");
						refetchPerformerCurrentEvent();
					});

					eventChannel.bind("intermission_timer_ended", function (data: any) {
						console.log("intermission timer ended socket");
						timestampRefetch();
						refetchPerformerCurrentEvent();
					});
				}
			}

			return () => {
				pusher.unsubscribe(eventChannelId);
				pusher.disconnect();
			};
		}, [specificEventId]);
		return <></>;
	}

	function PusherInnerPromoter() {
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
				<>
					{userType === "performer" ? (
						<PusherInnerPerformer />
					) : (
						<PusherInnerPromoter />
					)}
				</>
			) : (
				<></>
			)}
		</>
	);
}

export default PusherLogic;
