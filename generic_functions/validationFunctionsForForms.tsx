/** @format */

export function cleanUsername(input: string): string {
	let result = input.replace(/[^a-zA-Z0-9\s-]/g, "");

	result = result.replace(/\s+/g, " ");

	return result;
}
export function cleanWhitespace(input: string): string {
	// Replace consecutive whitespace with a single space and then trim the string
	return input.replace(/\s+/g, " ");
}
export function cleanAnnouncementMessage(input: string): string {
	let result = input.replace(/[^a-zA-Z0-9\s-\.!?]/g, "");

	result = result.replace(/\s+/g, " ");

	return result;
}
