/** @format */

import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

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
