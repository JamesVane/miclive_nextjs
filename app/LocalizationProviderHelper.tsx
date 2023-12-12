/** @format */

"use client";
/** @format */

import React from "react";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { LocalizationProvider } from "@mui/x-date-pickers";

function LocalizationProviderHelper({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<LocalizationProvider dateAdapter={AdapterLuxon}>
			{children}
		</LocalizationProvider>
	);
}

export default LocalizationProviderHelper;
