/** @format */

import { useEffect, useRef, useMemo, useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import {
	ArrowBackIosRounded,
	ArrowForwardIosRounded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
	switchPage,
	setBaseEventDescription,
	addToBaseEventImageArray,
} from "@/store/promoterCreateEventSlice";
import "quill/dist/quill.snow.css";
import { RootState } from "@/app/LocalizationProviderHelper";
import CreateEventCrumbsMobile from "./CreateEventCrumbsMobile";
import ReactQuill from "react-quill";
import styles from "./styles.module.css";
import { v4 as uuidv4 } from "uuid";
import { formats, Pallate } from "@/textEditorSettings";
import { postUploadS3Image } from "@/api_functions_need_to_add_auth/postUploadS3Image";
import imageCompression from "browser-image-compression";

function BaseEventDescriptionMobile() {
	const dispatch = useDispatch();

	const [imageLoadingInProgress, setImageLoadingInProgress] = useState(false);
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

	function insertToEditor(url: string) {
		if (quillRef.current) {
			const editor = quillRef.current.getEditor();
			editor.insertEmbed(editor.getSelection()?.index!, "image", url);
		}
	}

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
					dispatch(addToBaseEventImageArray(newUrlPath));
					const returnUrl = `https://miclivedevuserphotos.s3.us-east-2.amazonaws.com/${newUrlPath}`;
					insertToEditor(returnUrl);
				}
			});
			setImageLoadingInProgress(false);
		};
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

	return (
		<>
			<Button
				disabled={
					imageLoadingInProgress || description === null || description === ""
						? true
						: false
				}
				onClick={() => dispatch(switchPage({ page: "specificEvent" }))}
				endIcon={<ArrowForwardIosRounded />}
				variant="outlined"
				sx={{ position: "fixed", right: 10, bottom: 10, zIndex: "2000" }}>
				Continue
			</Button>
			<Button
				disabled={imageLoadingInProgress}
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
						position: "relative",
					}}>
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
