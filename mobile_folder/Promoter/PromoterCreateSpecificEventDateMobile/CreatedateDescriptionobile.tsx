/** @format */

import { useEffect, useRef, useState } from "react";
import { Paper, Button } from "@mui/material";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBackIosRounded, AddRounded } from "@mui/icons-material";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import CreateDateCrumbsMobile from "./CreateDateCrumbsMobile";
import { RootState } from "@/store/rootStore";
import {
	switchPageDate,
	setDescriptionDate,
} from "@/store/CreateEventDateSlice";
import { modules, formats } from "@/textEditorSettings";
import CreateEventLoadingMobile from "../CreateEventLoadingMobile";

interface CreatedateDescriptionobileProps {
	handleCreateEvent: () => void;
}

function CreatedateDescriptionobile({
	handleCreateEvent,
}: CreatedateDescriptionobileProps) {
	const dispatch = useDispatch();
	const quillRef = useRef<ReactQuill | null>(null);

	const [creatingSplash, setCreatingSplash] = useState(false);

	const { description } = useSelector(
		(state: RootState) => state.promoterCreateDate
	);

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
		<>
			{creatingSplash ? <CreateEventLoadingMobile /> : null}
			<Paper className={styles.bottom_paper_nav}>
				<div className={styles.bottom_paper_div_helper}>
					<Button
						color="success"
						size="small"
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
						sx={{ position: "absolute", right: 10 }}>
						create event
					</Button>
					<CreateDateCrumbsMobile />
					<Button
						disabled={creatingSplash}
						size="small"
						onClick={() => dispatch(switchPageDate({ page: "specificEvent" }))}
						startIcon={<ArrowBackIosRounded />}
						variant="outlined"
						sx={{ position: "absolute", left: 10 }}>
						Back
					</Button>
				</div>
			</Paper>

			<div
				style={{
					display: "flex",
					width: "100%",
					flexDirection: "column",
				}}>
				<ReactQuill
					ref={quillRef}
					placeholder="Enter Event Description Here"
					className={styles.quill}
					style={{
						height: "400px",
						width: "100%",
						fontFamily: "'Roboto', sans-serif",
					}}
					theme="snow"
					modules={modules}
					formats={formats}
					value={description !== null ? JSON.parse(description) : undefined}
				/>
			</div>
		</>
	);
}

export default CreatedateDescriptionobile;
