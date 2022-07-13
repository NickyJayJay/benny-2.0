import { useEffect, useRef } from 'react';

const useOutsideClick = (callback) => {
	const ref = useRef<HTMLElement>();

	useEffect(() => {
		const handleClick = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				callback(event); //disregard eslint warning - callback is wrapped in useCallback where it's defined
			}
		};

		document.addEventListener('click', (e) => handleClick(e));

		return () => {
			document.removeEventListener('click', (e) => handleClick(e));
		};
	}, [ref]);

	return ref;
};

export default useOutsideClick;
