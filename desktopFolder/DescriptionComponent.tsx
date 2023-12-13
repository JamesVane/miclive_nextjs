/** @format */
"use client";

import React from "react";
import ReactQuill from "react-quill";

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
