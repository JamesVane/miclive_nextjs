/** @format */

import { useEffect, useRef } from "react";
import { Button } from "@mui/material";
import styles from "./styles.module.css";
import { Pallate } from "./Pallette";
import {
	ArrowBackIosRounded,
	ArrowForwardIosRounded,
} from "@mui/icons-material";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/rootStore";
import CreateEventCrumbs from "./CreateEventCrumbs";
import CreateHeader from "./CreateHeader";
import { modules, formats } from "@/textEditorSettings";
import {
	switchPage,
	setBaseEventDescription,
} from "@/store/promoterCreateEventSlice";

function CreateBaseEventDescription() {
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

	return (
		<div className={styles.base_event_paper} style={{ overflow: "visible" }}>
			<Button
				disabled={description === null || description === "" ? true : false}
				onClick={() => dispatch(switchPage({ page: "specificEvent" }))}
				endIcon={<ArrowForwardIosRounded />}
				variant="outlined"
				sx={{ position: "absolute", right: 10, bottom: 10 }}>
				Continue
			</Button>
			<Button
				onClick={() => dispatch(switchPage({ page: "Banner" }))}
				startIcon={<ArrowBackIosRounded />}
				variant="outlined"
				sx={{ position: "absolute", left: 10, bottom: 10 }}>
				Back
			</Button>
			<CreateHeader>
				<div className={styles.header_primary}>Event</div>Description
			</CreateHeader>

			<div className={styles.desc_container_div}>
				<ReactQuill
					ref={quillRef}
					placeholder="Enter Event Description Here"
					className={styles.quill}
					style={{
						height: "calc(100% - 50px",
						width: "100%",
						fontFamily: "'Roboto', sans-serif",
					}}
					theme="snow"
					modules={modules}
					formats={formats}
					value={description !== null ? JSON.parse(description) : undefined}
				/>
			</div>
			<CreateEventCrumbs />
		</div>
	);
}

export default CreateBaseEventDescription;
