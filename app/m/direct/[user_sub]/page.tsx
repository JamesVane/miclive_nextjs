/** @format */

import React from "react";
import ConversationPage from "@mobi/Messaging/ConversationPage";

function page({ params }: { params: { user_sub: string } }) {
	return <ConversationPage />;
}

export default page;
