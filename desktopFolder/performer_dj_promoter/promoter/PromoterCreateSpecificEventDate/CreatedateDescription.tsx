/** @format */

import { useEffect, useRef, useState } from "react";
import { Paper, Button } from "@mui/material";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBackIosRounded, AddRounded } from "@mui/icons-material";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import CreateDateCrumbs from "./CreateDateCrumbs";
import CreateHeaderSpecific from "./CreateHeaderSpecific";
import { RootState } from "@/store/rootStore";
import {
	switchPageDate,
	setDescriptionDate,
} from "@/store/CreateEventDateSlice";
import { modules, formats } from "@/textEditorSettings";
import SplashLoadingComponent from "@/SplashPage";

interface CreatedateDescriptionProps {
	handleCreateEvent: () => void;
}

function CreatedateDescription({
	handleCreateEvent,
}: CreatedateDescriptionProps) {
	const dispatch = useDispatch();
	const quillRef = useRef<ReactQuill | null>(null);

	const { description } = useSelector(
		(state: RootState) => state.promoterCreateDate
	);

	const [creatingSplash, setCreatingSplash] = useState(false);

	useEffect(() => {
		if (quillRef.current) {
			const quill = quillRef.current.getEditor();
			quill.on("text-change", () => {
				const deltaJson = JSON.stringify(quill.getContents());
				dispatch(setDescriptionDate({ description: deltaJson }));
			});
		}
	}, []);

	return (
		<Paper className={styles.base_event_paper} style={{ overflow: "visible" }}>
			<Button
				color="success"
				disabled={
					creatingSplash || description === null || description === ""
						? true
						: false
				}
				onClick={() => {
					setCreatingSplash(true);
					handleCreateEvent();
				}}
				endIcon={<AddRounded />}
				variant="outlined"
				sx={{ position: "absolute", right: 10, bottom: 10 }}>
				Create Event
			</Button>
			<Button
				disabled={creatingSplash}
				onClick={() => dispatch(switchPageDate({ page: "specificEvent" }))}
				startIcon={<ArrowBackIosRounded />}
				variant="outlined"
				sx={{ position: "absolute", left: 10, bottom: 10 }}>
				Back
			</Button>
			<CreateHeaderSpecific>Event Date Description</CreateHeaderSpecific>
			{creatingSplash ? <SplashLoadingComponent /> : null}
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
						height: "550px",
						width: "100%",
						fontFamily: "'Roboto', sans-serif",
					}}
					theme="snow"
					modules={modules}
					formats={formats}
					value={description !== null ? JSON.parse(description) : undefined}
				/>
			</div>
			<CreateDateCrumbs />
		</Paper>
	);
}

export default CreatedateDescription;
