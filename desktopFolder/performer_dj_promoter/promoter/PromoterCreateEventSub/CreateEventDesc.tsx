/** @format */

import { useEffect, useRef, useState, useMemo } from "react";
import { Button, CircularProgress } from "@mui/material";
import styles from "./styles.module.css";
import { ArrowBackIosRounded, AddRounded } from "@mui/icons-material";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import "quill/dist/quill.snow.css";
import {
	switchPage,
	setDescription,
	addToDateImageArray,
} from "@/store/promoterCreateEventSlice";
import { RootState } from "@/app/LocalizationProviderHelper";
import CreateEventCrumbs from "./CreateEventCrumbs";
import CreateHeader from "./CreateHeader";
import { formats, Pallate } from "@/textEditorSettings";
import SplashLoadingComponent from "@/SplashPage";
import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from "uuid";
import { postUploadS3Image } from "@/api_functions_need_to_add_auth/postUploadS3Image";

interface CreateEventDescProps {
	handleCreateEvent: () => void;
}

function CreateEventDesc({ handleCreateEvent }: CreateEventDescProps) {
	const dispatch = useDispatch();

	const [imageLoadingInProgress, setImageLoadingInProgress] = useState(false);
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
			const newUrlPath = `rich_text_image/event_date_desc_${newUuid}`;

			await postUploadS3Image(adjustedBase64String, newUrlPath).then((res) => {
				if (res.status === 200) {
					dispatch(addToDateImageArray(newUrlPath));
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
		<div className={styles.base_event_paper} style={{ overflow: "visible" }}>
			<Button
				color="success"
				disabled={
					imageLoadingInProgress ||
					creatingSplash ||
					description === null ||
					description === ""
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
				disabled={imageLoadingInProgress || creatingSplash}
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
