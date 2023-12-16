/** @format */

import { useEffect, useRef, useState, useMemo } from "react";
import { Button } from "@mui/material";
import styles from "./styles.module.css";
import { formats, Pallate } from "@/textEditorSettings";
import { ClearRounded, CheckRounded } from "@mui/icons-material";
import _ from "lodash";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import "quill/dist/quill.snow.css";
import { RootState } from "@/store/rootStore";
import { postUploadS3Image } from "@/api_functions/postUploadS3Image";
import {
	setBaseDescription,
	addToEditArray,
} from "@/store/promoterEditEventSlice";
import { v4 as uuidv4 } from "uuid";
import { deleteImageFromS3 } from "@/api_functions/deleteImageFromS3";

interface EditBaseEventDescriptionProps {
	updateDescription: (returnArray: string[]) => void;
	exit: () => void;
}

function EditBaseEventDescription({
	exit,
	updateDescription,
}: EditBaseEventDescriptionProps) {
	const dispatch = useDispatch();
	const [mountedState, setMountedState] = useState<string | null>("");
	const quillRef = useRef<ReactQuill | null>(null);
	const { baseDescription: descriptionAndArray, baseEventId } = useSelector(
		(state: RootState) => state.promoterEditEvent
	);
	const description = descriptionAndArray.description;
	const editArray = descriptionAndArray.image_array;

	function saveToServer(file: File) {
		const newUuid = uuidv4();
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			const base64String = reader.result as string;
			const adjustedBase64String = base64String.split(",")[1];
			const newUrlPath = `rich_text_image/base_event_desc_${baseEventId}_${newUuid}`;

			postUploadS3Image(adjustedBase64String, newUrlPath).then((res) => {
				if (res.status === 200) {
					dispatch(addToEditArray(newUrlPath));
					const returnUrl = `https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/${newUrlPath}`;
					insertToEditor(returnUrl);
				}
			});
		};
	}

	function insertToEditor(url: string) {
		if (quillRef.current) {
			const editor = quillRef.current.getEditor();
			editor.insertEmbed(editor.getSelection()?.index!, "image", url);
		}
	}

	const imageHandler = (a: any) => {
		const input = document.createElement("input");
		input.setAttribute("type", "file");
		input.setAttribute("accept", "image/*");
		input.click();

		{
			input.onchange = () => {
				const file = input.files![0];

				// file type is only image.
				if (/^image\//.test(file.type)) {
					saveToServer(file);
				} else {
					console.warn("You could only upload images.");
				}
			};
		}
	};

	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
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
				handlers: {
					image: imageHandler,
				},
			},
		}),
		[]
	);

	function getReturnArray() {
		console.log("editArray", editArray);
		let holdEditArray = [];
		for (let x in editArray) {
			console.log("x", x);
			if (description?.includes(editArray[x])) {
				console.log("ADDING!!!");
				holdEditArray.push(editArray[x]);
			} else {
				console.log("DELETING!!!!");
				deleteImageFromS3(editArray[x]);
			}
		}
		return holdEditArray;
	}

	useEffect(() => {
		if (quillRef.current) {
			const quill = quillRef.current.getEditor();
			quill.on("text-change", () => {
				const deltaJson = JSON.stringify(quill.getContents());
				dispatch(setBaseDescription({ description: deltaJson }));
			});
		}
	}, []);

	useEffect(() => {
		setMountedState(description);
	}, []);

	return (
		<>
			<div
				className={styles.description_main_div}
				style={{ overflow: "visible" }}>
				<div className={styles.description_second_div}>
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
				<div className={styles.bottom_row}>
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
						onClick={() => {
							updateDescription(getReturnArray());
						}}
						endIcon={<CheckRounded />}
						variant="outlined"
						sx={{ position: "absolute", right: 10, bottom: 10 }}>
						Save
					</Button>
				</div>
			</div>
		</>
	);
}

export default EditBaseEventDescription;
