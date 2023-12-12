/** @format */

import ConversationRow from "./ConversationRow";

type InnerObjectType = {
	name: string;
	type: "performer" | "promoter" | "dj";
	roleId: number;
	DND: boolean;
	pinned: boolean;
	timestamp: number;
	topMessage: string;
	unOpened: boolean;
};

type ConversationListType = {
	[userSub: string]: InnerObjectType;
};

interface ConversationRowHelperProps {
	conversationObject: ConversationListType;
}

function ConversationRowHelper({
	conversationObject,
}: ConversationRowHelperProps) {
	// Sort by pinned first, then by timestamp descending, then by DND
	const sortedConversations = Object.entries(conversationObject).sort(
		([keyA, dataA], [keyB, dataB]) => {
			// Sorting by pinned status
			if (dataA.pinned && !dataB.pinned) return -1;
			if (!dataA.pinned && dataB.pinned) return 1;

			// Sorting by DND status
			if (!dataA.DND && dataB.DND) return -1;
			if (dataA.DND && !dataB.DND) return 1;

			// Sorting by timestamp
			if (dataA.timestamp > dataB.timestamp) return -1;
			if (dataA.timestamp < dataB.timestamp) return 1;

			return 0;
		}
	);

	const splitSortedConversations =
		Object.keys(conversationObject).length === 1
			? [Object.entries(conversationObject)[0]]
			: sortedConversations;

	return (
		<>
			{splitSortedConversations.map(([userSub, data]) => (
				<>
					{userSub === "None" ? null : (
						<ConversationRow
							unOpened={data.unOpened}
							key={userSub}
							sub={userSub}
							name={data.name}
							type={data.type}
							roleId={data.roleId}
							timestamp={data.timestamp}
							topMessage={data.topMessage}
							DND={data.DND}
							pinned={data.pinned}
						/>
					)}
				</>
			))}
		</>
	);
}

export default ConversationRowHelper;
