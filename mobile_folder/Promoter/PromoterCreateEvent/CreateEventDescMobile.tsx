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
import CreateEventCrumbsMobile from "./CreateEventCrumbsMobile";
import { modules, formats } from "@/textEditorSettings";
import CreateEventLoadingMobile from "../CreateEventLoadingMobile";

interface CreateEventDescMobileProps {
	handleCreateEvent: () => void;
}

function CreateEventDescMobile({
	handleCreateEvent,
}: CreateEventDescMobileProps) {
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
		<>
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
				sx={{ position: "fixed", right: 10, bottom: 10, zIndex: "2000" }}>
				create event
			</Button>
			<Button
				disabled={creatingSplash}
				onClick={() => dispatch(switchPage({ page: "specificEvent" }))}
				startIcon={<ArrowBackIosRounded />}
				variant="outlined"
				sx={{ position: "fixed", left: 10, bottom: 10, zIndex: "2000" }}>
				Back
			</Button>
			<div className={styles.desc_main_div} style={{ overflow: "visible" }}>
				{creatingSplash ? <CreateEventLoadingMobile /> : null}
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

export default CreateEventDescMobile;
