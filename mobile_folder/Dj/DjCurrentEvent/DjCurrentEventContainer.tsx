/** @format */
"use client";

import React from "react";
import DjCurrentEvent from "./DjCurrentEvent";

interface DjCurrentEventContainerProps {
	specificEventId: string;
}

function DjCurrentEventContainer({
	specificEventId,
}: DjCurrentEventContainerProps) {
	return <DjCurrentEvent />;
}

export default DjCurrentEventContainer;
