/** @format */

"use client";
/** @format */

import { useEffect } from "react";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { isMobile } from "react-device-detect";
import { usePathname, useRouter } from "next/navigation";
import awsExports from "../aws-exports";
import { Amplify } from "aws-amplify";
Amplify.configure(awsExports);

function LocalizationProviderHelper({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const router = useRouter();

	useEffect(() => {
		if (isMobile && !pathname.startsWith("/m")) {
			console.log("redirecting to mobile");
			router.replace("/m" + pathname);
		}
		if (!isMobile && pathname.startsWith("/m")) {
			console.log("redirecting to desktop");
			if (pathname.length === 2) {
				router.replace("/");
			} else {
				router.replace(pathname.slice(2));
			}
		}
	}, [isMobile, pathname]);

	return (
		<LocalizationProvider dateAdapter={AdapterLuxon}>
			{children}
		</LocalizationProvider>
	);
}

export default LocalizationProviderHelper;
