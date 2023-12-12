/** @format */

import PersonRowMobile from "./PersonRowMobile";
import { useDispatch } from "react-redux";
import { setViewUserInfoModalSlice } from "@/store/viewUserInfoModalSlice";

interface PersonRowMobileContainerProps {
	roleId: number;
	type: "promoter" | "dj";
	name: string;
	userSub: string;
	tagline: string;
	info: {
		City?: string;
		Email?: string;
		Phone?: string;
		IG?: string;
		Link?: string;
	} | null;
}

function PersonRowMobileContainer({
	roleId,
	type,
	name,
	userSub,
	tagline,
	info,
}: PersonRowMobileContainerProps) {
	const dispatch = useDispatch();

	function handleViewInfo() {
		dispatch(
			setViewUserInfoModalSlice({
				roleId: roleId,
				userType: type,
				name: name,
				tagline: tagline,
				info: info,
				userSub: userSub,
			})
		);
	}

	return (
		<PersonRowMobile
			roleId={roleId}
			type={type}
			name={name}
			handleClick={handleViewInfo}
		/>
	);
}

export default PersonRowMobileContainer;
