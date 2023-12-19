/** @format */

import type { Metadata } from "next";
import "react-quill/dist/quill.bubble.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { darkTheme } from "./muiprovider";
import LocalizationProviderHelper from "./LocalizationProviderHelper";
import SocketWrapperHelper from "./SocketWrapperHelper";
import LayoutWrapper from "./LayoutWrapper";
import "../theme-variables.css";
import "./global.css";
import awsExports from "../aws-exports";
import { Amplify } from "aws-amplify";
Amplify.configure({ ...awsExports, ssr: true });

export const revalidate = 0;
export const dynamic = "force-dynamic";

const inter = Inter({ subsets: ["latin"] });
/* 
export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
}; */

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link
					rel="apple-touch-icon"
					href="/apple-icon?<generated>"
					type="image/<generated>"
					sizes="<generated>"
				/>
				<link rel="icon" href="/favicon.ico" sizes="any" />
				<link
					rel="icon"
					href="/icon?<generated>"
					type="image/<generated>"
					sizes="<generated>"
				/>
			</head>
			<meta property="Sec-Fetch-Dest" content="document" />
			<meta property="Sec-Fetch-Mode" content="navigate" />
			<meta property="Sec-Fetch-Site" content="same-origin" />
			<meta property="Sec-Fetch-User" content="?1" />
			<LocalizationProviderHelper>
				<ThemeProvider theme={darkTheme}>
					<SocketWrapperHelper>
						<LayoutWrapper>
							<CssBaseline />
							<body className={inter.className}>{children}</body>
						</LayoutWrapper>
					</SocketWrapperHelper>
				</ThemeProvider>
			</LocalizationProviderHelper>
		</html>
	);
}
