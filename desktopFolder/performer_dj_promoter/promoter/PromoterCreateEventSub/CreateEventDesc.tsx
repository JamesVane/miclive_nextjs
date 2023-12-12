/** @format */

import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import styles from "./styles.module.css";
import { ArrowBackIosRounded, AddRounded } from "@mui/icons-material";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import "quill/dist/quill.snow.css";
import { switchPage, setDescription } from "@/store/promoterCreateEventSlice";
import { RootState } from "@/store/rootStore";
import CreateEventCrumbs from "./CreateEventCrumbs";
import CreateHeader from "./CreateHeader";
import { modules, formats } from "@/textEditorSettings";
import SplashLoadingComponent from "@/SplashPage";

interface CreateEventDescProps {
	handleCreateEvent: () => void;
}

function CreateEventDesc({ handleCreateEvent }: CreateEventDescProps) {
	const dispatch = useDispatch();
	const quillRef = useRef<ReactQuill | null>(null);
	const { description } = useSelector(
		(state: RootState) => state.promoterCreateEvent
	);
	const [creatingSplash, setCreatingSplash] = useState(false);

	useEffect(() => {
		if (quillRef.current) {
			const quill = quillRef.current.getEditor();
			quill.on("text-change", () => {
				const deltaJson = JSON.stringify(quill.getContents());
				dispatch(setDescription({ description: deltaJson }));
			});
		}
	}, []);

	return (
		<div className={styles.base_event_paper} style={{ overflow: "visible" }}>
			<Button
				color="success"
				disabled={
					creatingSplash || description === null || description === ""
						? true
						: false
				}
				endIcon={<AddRounded />}
				variant="outlined"
				onClick={() => {
					setCreatingSplash(true);
					handleCreateEvent();
				}}
				sx={{ position: "absolute", right: 10, bottom: 10 }}>
				Create Event
			</Button>

			<Button
				disabled={creatingSplash}
				onClick={() => dispatch(switchPage({ page: "specificEvent" }))}
				startIcon={<ArrowBackIosRounded />}
				variant="outlined"
				sx={{ position: "absolute", left: 10, bottom: 10 }}>
				Back
			</Button>
			{creatingSplash ? <SplashLoadingComponent /> : null}
			<CreateHeader>
				<div className={styles.header_primary}>Date</div>Description
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

export default CreateEventDesc;
