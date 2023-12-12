/** @format */

import { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import {
	ArrowBackIosRounded,
	ArrowForwardIosRounded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
	switchPage,
	setBaseEventDescription,
} from "@/store/promoterCreateEventSlice";
import "quill/dist/quill.snow.css";
import { RootState } from "@/store/rootStore";
import CreateEventCrumbsMobile from "./CreateEventCrumbsMobile";
import ReactQuill from "react-quill";
import styles from "./styles.module.css";
import { Pallate } from "@/Pallette";

function BaseEventDescriptionMobile() {
	const dispatch = useDispatch();
	const quillRef = useRef<ReactQuill | null>(null);
	const { baseEventDescription: description } = useSelector(
		(state: RootState) => state.promoterCreateEvent
	);

	useEffect(() => {
		if (quillRef.current) {
			const quill = quillRef.current.getEditor();
			quill.on("text-change", () => {
				const deltaJson = JSON.stringify(quill.getContents());
				dispatch(setBaseEventDescription({ description: deltaJson }));
			});
		}
	}, []);

	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			[{ size: [] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[{ align: ["right", "center", "justify"] }],
			[{ list: "ordered" }, { list: "bullet" }],
			["link", "image"],
			[{ color: Pallate }],
			[{ background: Pallate }],
			["clean"],
		],
	};

	const formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"link",
		"color",
		"image",
		"background",
		"align",
		"size",
		"clean",
	];

	return (
		<>
			<Button
				disabled={description === null || description === "" ? true : false}
				onClick={() => dispatch(switchPage({ page: "specificEvent" }))}
				endIcon={<ArrowForwardIosRounded />}
				variant="outlined"
				sx={{ position: "fixed", right: 10, bottom: 10, zIndex: "2000" }}>
				Continue
			</Button>
			<Button
				onClick={() => dispatch(switchPage({ page: "Banner" }))}
				startIcon={<ArrowBackIosRounded />}
				variant="outlined"
				sx={{ position: "fixed", left: 10, bottom: 10, zIndex: "2000" }}>
				Back
			</Button>
			<div className={styles.desc_main_div} style={{ overflow: "visible" }}>
				<div
					style={{
						display: "flex",
						width: "100%",
						height: "625px",
						flexDirection: "column",
					}}>
					<ReactQuill
						ref={quillRef}
						placeholder="Enter Event Description Here"
						className={styles.quill}
						style={{
							height: "calc(100% - 160px)",
							width: "100%",
							fontFamily: "'Roboto', sans-serif",
						}}
						theme="snow"
						modules={modules}
						formats={formats}
						value={description !== null ? JSON.parse(description) : undefined}
					/>
				</div>
				<CreateEventCrumbsMobile />
			</div>
		</>
	);
}

export default BaseEventDescriptionMobile;
