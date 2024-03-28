/** @format */
import { useEffect, useState } from "react";
import { getLinkPreviewInfo } from "@/api_functions/getLinkPreviewInfo";
import styles from "./styles.module.css";
import { InsertLinkRounded } from "@mui/icons-material";

interface LinkPreviewProps {
	url: string;
}

function ProfilePageLinkComponent({ url }: LinkPreviewProps) {
	const [previewImage, setPreviewImage] = useState<"string" | null>(null);
	const [previewTitle, setPreviewTitle] = useState<"string" | null>(null);
	const [previewDescription, setPreviewDescription] = useState<"string" | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);
	const [imageHeight, setImageHeight] = useState<number | null>(null);
	const [imageWidth, setImageWidth] = useState<number | null>(null);
	const [siteName, setSiteName] = useState<"string" | null>(null);

	useEffect(() => {
		const getMeta = (
			url: string,
			cb: (err: string | Event | null, img?: any) => void
		) => {
			const img = new Image();
			img.onload = () => cb(null, img);
			img.onerror = (err) => cb(err);
			img.src = url;
		};

		async function makeRequest() {
			const responseInfo = await getLinkPreviewInfo(url);
			if (responseInfo) {
				if (responseInfo.image) {
					getMeta(responseInfo.image, (err, img) => {
						if (img.naturalHeight) {
							setImageHeight(img.naturalHeight);
						}
						if (img.naturalWidth) {
							setImageWidth(img.naturalWidth);
						}
					});
					setPreviewImage(responseInfo.image);
				}
				if (responseInfo.title) {
					setPreviewTitle(responseInfo.title);
				}
				if (responseInfo.site_name) {
					setSiteName(responseInfo.site_name);
				}
				if (responseInfo.description) {
					setPreviewDescription(responseInfo.description);
				}
			}
			setIsLoading(false);
		}
		makeRequest();
	}, []);

	const displaySiteNamePrPreviewTitle =
		siteName && siteName.includes("www") ? previewTitle : siteName;

	const ratoMultiplier =
		imageHeight && imageWidth ? imageWidth / imageHeight : 1;
	return (
		<div className={styles.profile_page_link_component_container}>
			<div
				className={styles.link_component_image_container}
				style={{
					width: `calc(65px * ${ratoMultiplier})`,
				}}>
				<div className={styles.event_pic_inner}>
					{previewImage ? (
						<img
							src={previewImage}
							style={{
								height: "100%",
								width: "100%",
								objectFit: "cover",
							}}
						/>
					) : null}
				</div>
			</div>
			<div className={styles.link_component_right}>
				<div className={styles.link_component_title}>
					{displaySiteNamePrPreviewTitle}
				</div>
				<div className={styles.link_component_desc}>
					<div className={styles.elipses_text}>{previewDescription}</div>
				</div>
			</div>
			<InsertLinkRounded
				sx={{
					position: "absolute",
					right: "10px",
					height: "40px",
					width: "40px",
				}}
			/>
		</div>
	);
}

export default ProfilePageLinkComponent;
