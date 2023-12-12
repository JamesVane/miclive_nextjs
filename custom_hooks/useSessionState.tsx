/** @format */
"use client";

import { useState, useEffect } from "react";

export function useSessionState<T>(
	key: string,
	defaultValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const [state, setState] = useState<T>(() => {
		const storedValue = sessionStorage.getItem(key);
		return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
	});

	useEffect(() => {
		sessionStorage.setItem(key, JSON.stringify(state));
	}, [key, state]);

	return [state, setState];
}
