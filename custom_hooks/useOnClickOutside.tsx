import { useEffect } from 'react';

export function useOnClickOutside<T extends HTMLElement>(
  ref: React.RefObject<T>,
  callback: (event: MouseEvent) => void
) {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback(event);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, [ref, callback]);
}
