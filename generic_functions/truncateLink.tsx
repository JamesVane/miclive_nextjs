/** @format */

export function truncateLink(link: string, maxLength: number): string {
	if (link.length <= maxLength) {
		return link;
	}
	const url = new URL(link);
	return `${url.protocol}//${url.hostname}...`;
}
