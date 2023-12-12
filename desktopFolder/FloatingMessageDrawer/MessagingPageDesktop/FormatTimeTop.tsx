/** @format */

import { DateTime } from "luxon";
import React from "react";

type TimeSinceProps = {
	timestamp: number;
};

const FormatTimeTop: React.FC<TimeSinceProps> = ({ timestamp }) => {
	const now = DateTime.utc();
	const then = DateTime.fromMillis(timestamp, { zone: "utc" });
	const diff = now.diff(then, ["years", "months", "days", "hours", "minutes"]);

	// If the difference is less than 24 hours, return in 12-hour format
	if (diff.days < 1) {
		return <>{then.toFormat("h:mm")}</>;
	}
	// If the difference is less than 7 days, return number of days
	else if (diff.days < 7) {
		return <>{diff.days}D</>;
	}
	// If the difference is less than 4 weeks, return number of weeks
	else if (diff.days < 28) {
		return <>{Math.floor(diff.days / 7)}W</>;
	}
	// If the difference is less than a year, return number of months
	else if (diff.years < 1) {
		return <>{diff.months}M</>;
	}
	// Otherwise, return number of years
	else {
		return <>{diff.years}Y</>;
	}
};

export default FormatTimeTop;
