/** @format */

import { useEffect, useRef } from "react";
import { clearInterval, setInterval } from "worker-timers";

export function useInterval(callback: () => void, delay: number | null) {
	const savedCallback = useRef<() => void>(() => {});

	// Remember the latest callback.
	useEffect(() => {
		savedCallback.current = callback;
	}, [callback]);

	// Set up the interval.
	useEffect(() => {
		function tick() {
			savedCallback.current();
		}
		if (delay !== null) {
			let id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}
