/** @format */

import React from "react";
import AddInitialAccountInfo from "@desk/AddInitialAccountInfo";

function page({ params }: { params: { type: string } }) {
	return (
		<>
			{params.type === "promoter" ||
			params.type === "performer" ||
			params.type === "dj" ? (
				<AddInitialAccountInfo paramsType={params.type} />
			) : (
				<div
					style={{
						height: "100vh",
						width: "100vw",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "red",
						fontSize: "25px",
						fontWeight: "bold",
					}}>
					Invalid URL
				</div>
			)}
		</>
	);
}

export default page;
