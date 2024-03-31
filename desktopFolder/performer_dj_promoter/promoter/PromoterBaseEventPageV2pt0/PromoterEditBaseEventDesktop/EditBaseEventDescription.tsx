/** @format */

import { useEffect, useRef, useState, useMemo } from "react";
import { Button, CircularProgress } from "@mui/material";
import styles from "./styles.module.css";
import { formats, Pallate } from "@/textEditorSettings";
import { ClearRounded, CheckRounded } from "@mui/icons-material";
import _ from "lodash";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import "quill/dist/quill.snow.css";
import { RootState } from "@/app/LocalizationProviderHelper";
import { postUploadS3Image } from "@/api_functions_need_to_add_auth/postUploadS3Image";
import { setBaseDescription } from "@/store/promoterEditEventSlice";
import { v4 as uuidv4 } from "uuid";
import { deleteImageFromS3 } from "@/api_functions/deleteImageFromS3";
import imageCompression from "browser-image-compression";
import { getBaseEventImageArray } from "@/api_functions/getBaseEventImageArray";
import { addStringToBaseEventImageArray } from "@/api_functions/addStringToBaseEventImageArray";

interface EditBaseEventDescriptionProps {
	updateDescription: (returnArray: string[]) => void;
	exit: () => void;
}

function EditBaseEventDescription({
	exit,
	updateDescription,
}: EditBaseEventDescriptionProps) {
	const dispatch = useDispatch();
	const [imageLoadingInProgress, setImageLoadingInProgress] = useState(false);
	const [mountedState, setMountedState] = useState<string | null>("");
	const quillRef = useRef<ReactQuill | null>(null);
	const { baseDescription: description, baseEventId } = useSelector(
		(state: RootState) => state.promoterEditEvent
	);

	async function saveToServer(file: File) {
		const options = {
			maxSizeMB: 1,
			maxWidthOrHeight: 1920,
			useWebWorker: true,
		};

		const compressedFile = await imageCompression(file, options);

		const newUuid = uuidv4();
		const reader = new FileReader();
		reader.readAsDataURL(compressedFile);
		reader.onload = async () => {
			setImageLoadingInProgress(true);
			const base64String = reader.result as string;
			const adjustedBase64String = base64String.split(",")[1];
			const newUrlPath = `rich_text_image/base_event_desc_${newUuid}`;

			await postUploadS3Image(adjustedBase64String, newUrlPath).then((res) => {
				if (res.status === 200) {
					if (baseEventId) {
						addStringToBaseEventImageArray(baseEventId.toString(), newUrlPath);
						const returnUrl = `https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/${newUrlPath}`;
						insertToEditor(returnUrl);
					}
				}
			});
			setImageLoadingInProgress(false);
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

		input.onchange = () => {
			const file = input.files![0];
			if (/^image\//.test(file.type)) {
				saveToServer(file);
			} else {
				console.warn("You could only upload images.");
			}
		};
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

	async function getReturnArray() {
		let holdEditArray = [];

		if (baseEventId) {
			const baseEventIdString = baseEventId.toString();
			const editArray = await getBaseEventImageArray(baseEventIdString);
			for (let x in editArray) {
				if (description?.includes(editArray[x])) {
					holdEditArray.push(editArray[x]);
				} else {
					deleteImageFromS3(editArray[x]);
				}
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
		<div
			className={styles.description_main_div}
			style={{ overflow: "visible" }}>
			<div className={styles.description_second_div}>
				{imageLoadingInProgress ? (
					<CircularProgress
						size={100}
						sx={{
							position: "absolute",
							top: "200px",
							width: "100%",
							zIndex: "20",
						}}
					/>
				) : null}
				<ReactQuill
					readOnly={imageLoadingInProgress}
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
					disabled={imageLoadingInProgress}
					onClick={exit}
					endIcon={<ClearRounded />}
					variant="outlined"
					color="error">
					cancel
				</Button>
				<Button
					color="success"
					disabled={
						imageLoadingInProgress ||
						mountedState === "" ||
						_.isEqual(description, mountedState) ||
						description === null ||
						description === ""
							? true
							: false
					}
					onClick={async () => {
						const returnarray = await getReturnArray();
						updateDescription(returnarray);
					}}
					endIcon={<CheckRounded />}
					variant="outlined"
					sx={{ position: "absolute", right: 10, bottom: 10 }}>
					Save
				</Button>
			</div>
		</div>
	);
}

export default EditBaseEventDescription;
