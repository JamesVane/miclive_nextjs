/** @format */

import { djManageEventSliceType } from "../store/djManageEventSlice";
import { Auth } from "aws-amplify";

export async function getDjManageFullState(
	query_id: string
): Promise<djManageEventSliceType> {
	const currentUser = await Auth.currentAuthenticatedUser();
	const authToken = currentUser.signInUserSession.idToken.jwtToken;
	const apiendpoint = `https://lxhk6cienf.execute-api.us-east-2.amazonaws.com/Dev/djmanageevent/getdjmanagefullstate?query_id=${query_id}`;
	const response = await fetch(apiendpoint, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${authToken}`,
		},
	});
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	} else {
		const data = await response.json();

		// Splitting up roster into checked_in, not_checked_id, and has_performed
		const checked_in: { [cuePosition: number]: (typeof data.roster)[0] } = {
			0: {
				cue_position: 0,
				checked_in: false,
				performer_id: 0,
				time_used: 0,
				performer_name: "Event Not Started",
				submitted_audio: {},
			},
		};
		const not_checked_in: typeof data.roster = [
			{
				cue_position: 0,
				checked_in: false,
				performer_id: 0,
				time_used: 0,
				performer_name: "",
				submitted_audio: {},
			},
		];
		const has_performed: { [cuePosition: number]: (typeof data.roster)[0] } = {
			0: {
				cue_position: 0,
				checked_in: false,
				performer_id: 0,
				performer_name: "",
				submitted_audio: {},
			},
		};

		if (data.roster) {
			for (const rosterItem of data.roster) {
				if (!rosterItem.checked_in) {
					not_checked_in.push(rosterItem);
				} else if (rosterItem.cue_position >= data.event_cue_position) {
					checked_in[rosterItem.cue_position] = rosterItem;
				} else if (rosterItem.cue_position < data.event_cue_position) {
					has_performed[rosterItem.cue_position] = rosterItem;
				}
			}

			data.not_checked_in = not_checked_in;
			data.checked_in = checked_in;
			data.has_performed = has_performed;

			// Remove original roster property
			delete data.roster;

			return data;
		} else {
			data.not_checked_in = [
				{
					cue_position: 0,
					checked_in: false,
					performer_id: 0,
					time_used: 0,
					performer_name: "",
					submitted_audio: {},
				},
			];
			data.checked_in = {
				0: {
					cue_position: 0,
					checked_in: false,
					performer_id: 0,
					time_used: 0,
					performer_name: "Event Not Started",
					submitted_audio: {},
				},
			};
			data.has_performed = {
				0: {
					cue_position: 0,
					checked_in: false,
					performer_id: 0,
					time_used: 0,
					performer_name: "",
					submitted_audio: {},
				},
			};

			// Remove original roster property
			delete data.roster;

			return data;
		}

		// Reassign roster with new lists
	}
}
