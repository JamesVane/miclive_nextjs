/** @format */

export function formatSecondsToHHMMSS(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;

	const formattedHours = String(hours).padStart(2, "0");
	const formattedMinutes = String(minutes).padStart(2, "0");
	const formattedSeconds = String(remainingSeconds).padStart(2, "0");

	return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

export function formatSecondsToString(seconds: number): string {
	const minutes: number = Math.floor(seconds / 60);
	const remainingSeconds: number = seconds % 60;

	return `${minutes} Min, ${remainingSeconds} Sec`;
}

export const formatMMSS = (seconds: number): string => {
	const minutes: number = Math.floor(seconds / 60);
	const remainingSeconds: number = seconds % 60;

	const formattedMinutes: string = minutes < 10 ? `0${minutes}` : `${minutes}`;
	const formattedSeconds: string =
		remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;

	return `${formattedMinutes}:${formattedSeconds}`;
};

export function checkTimeValues(oldValue: string, newValue: string): string {
	const oldParts = oldValue.split(":");
	const newParts = newValue.split(":");

	// Extract minutes and seconds from the newValue.
	let newMinutes = parseInt(newParts[0], 10);
	let newSeconds = newParts[1] ? parseInt(newParts[1], 10) : 0;

	// Check if the minutes and seconds are both less than 60.
	if (newMinutes < 60 && newSeconds < 60) {
		// If the old value includes seconds (indicated by ':'), append seconds to new value as well.
		if (oldParts.length > 1) {
			return `${newMinutes}:${newSeconds.toString().padStart(2, "0")}`;
		} else {
			return `${newMinutes}`;
		}
	} else {
		// If the new values are not valid, return the old value.
		return oldValue;
	}
}

export function timeStringToSeconds(timeString: string): number {
	const timeParts = timeString.split(":").map(Number);
	let seconds = 0;
	if (timeParts.length === 3) {
		seconds += timeParts[0] * 3600; // hours to seconds
		seconds += timeParts[1] * 60; // minutes to seconds
		seconds += timeParts[2]; // seconds
	} else if (timeParts.length === 2) {
		seconds += timeParts[0] * 60; // minutes to seconds
		seconds += timeParts[1]; // seconds
	} else if (timeParts.length === 1) {
		seconds += timeParts[0]; // seconds
	} else {
		throw new Error(`Invalid time string: ${timeString}`);
	}
	return seconds;
}
