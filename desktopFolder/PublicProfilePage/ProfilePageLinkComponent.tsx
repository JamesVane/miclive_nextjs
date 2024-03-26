/** @format */
import { LinkPreview } from "@dhaiwat10/react-link-preview";

interface LinkPreviewProps {
	url: string;
}

function ProfilePageLinkComponent({ url }: LinkPreviewProps) {
	return (
		<div>
			<LinkPreview url={url} width="400px" />
		</div>
	);
}

export default ProfilePageLinkComponent;
