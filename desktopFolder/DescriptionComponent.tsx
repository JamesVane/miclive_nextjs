/** @format */
"use client";

import React from "react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), {
	ssr: false,
});

function DescriptionComponent({ text }: { text: string }) {
	return (
		<ReactQuill
			value={JSON.parse(text)}
			readOnly={true}
			theme="bubble"
			style={{
				width: "100%",
			}}
		/>
	);
}

export default DescriptionComponent;
