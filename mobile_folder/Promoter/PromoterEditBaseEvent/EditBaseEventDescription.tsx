/** @format */

import { useEffect, useRef, useState } from "react";
import { Paper, Button } from "@mui/material";
import styles from "./styles.module.css";
import { modules, formats } from "@/textEditorSettings";
import { ClearRounded, CheckRounded } from "@mui/icons-material";
import _ from "lodash";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import "quill/dist/quill.snow.css";
import { RootState } from "@/store/rootStore";
import { setBaseDescription } from "@/store/promoterEditEventSlice";

interface EditBaseEventDescriptionProps {
	updateDescription: () => void;
	exit: () => void;
}

function EditBaseEventDescription({
	exit,
	updateDescription,
}: EditBaseEventDescriptionProps) {
	const dispatch = useDispatch();
	const [mountedState, setMountedState] = useState<string | null>("");
	const quillRef = useRef<ReactQuill | null>(null);
	const { description } = useSelector(
		(state: RootState) => state.promoterEditEvent.baseDescription
	);

	useEffect(() => {
		if (quillRef.current) {
			const quill = quillRef.current.getEditor();
			quill.on("text-change", () => {
				const deltaJson = JSON.stringify(quill.getContents());
				dispatch(setBaseDescription({ description: deltaJson }));
				console.log("deltaJson", typeof deltaJson);
			});
		}
	}, []);

	useEffect(() => {
		setMountedState(description);
	}, []);

	return (
		<>
			<Paper square className={styles.bottom_row}>
				<Button
					onClick={exit}
					endIcon={<ClearRounded />}
					variant="outlined"
					color="error">
					cancel
				</Button>
				<Button
					color="success"
					disabled={
						mountedState === "" ||
						_.isEqual(description, mountedState) ||
						description === null ||
						description === ""
							? true
							: false
					}
					onClick={updateDescription}
					endIcon={<CheckRounded />}
					variant="outlined"
					sx={{ position: "absolute", right: 10, bottom: 10 }}>
					Save
				</Button>
			</Paper>
			<div
				className={styles.description_main_div}
				style={{ overflow: "visible" }}>
				<div className={styles.description_second_div}>
					<ReactQuill
						ref={quillRef}
						placeholder="Enter Event Description Here"
						className={styles.quill}
						style={{
							height: "calc(100vh - 272px)",
							width: "100%",
							fontFamily: "'Roboto', sans-serif",
						}}
						theme="snow"
						modules={modules}
						formats={formats}
						value={description !== null ? JSON.parse(description) : undefined}
					/>
				</div>
			</div>
		</>
	);
}

export default EditBaseEventDescription;
