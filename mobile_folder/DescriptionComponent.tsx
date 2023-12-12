/** @format */

import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

function DescriptionComponent({ text }: { text: string }) {
	return (
		<ReactQuill
			style={{ width: "97.5%" }}
			value={JSON.parse(text)}
			readOnly={true}
			theme="bubble"
		/>
	);
}

export default DescriptionComponent;
