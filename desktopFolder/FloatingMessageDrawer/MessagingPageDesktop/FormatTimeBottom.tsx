/** @format */

import { DateTime } from "luxon";
import React from "react";

type AmPmOrAgoProps = {
	timestamp: number;
};

const FormatTimeBottom: React.FC<AmPmOrAgoProps> = ({ timestamp }) => {
	const now = DateTime.utc();
	const then = DateTime.fromMillis(timestamp, { zone: "utc" });
	const diff = now.diff(then, ["days"]);

	// If the difference is less than 24 hours, return AM or PM
	if (diff.days < 1) {
		return <>{then.toFormat("a")}</>; // 'a' in toFormat outputs 'AM' or 'PM'
	} else {
		return <>ago</>;
	}
};

export default FormatTimeBottom;
