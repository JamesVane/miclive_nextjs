/**
 * import { useState, useEffect } from 'react';
 *
 * export function useLocalState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
 *   const [state, setState] = useState<T>(() => {
 *     const storedValue = localStorage.getItem(key);
 *     return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
 *   });
 *
 *   useEffect(() => {
 *     localStorage.setItem(key, JSON.stringify(state));
 *   }, [key, state]);
 *
 *   return [state, setState];
 * }
 *
 * @format
 */
