import { useEffect, useReducer, useState } from 'react';
import { createVirtualizer, type CreateVirtualizerOptions } from '../core';

export type UseVirtualizeOptions = CreateVirtualizerOptions;

export function useVirtualize(options: UseVirtualizeOptions) {
	const [, reRender] = useReducer(() => ({}), {});

	const [virtualizer] = useState(() => createVirtualizer(options));

	// Set the options on each render to ensure the latest options are used.
	virtualizer.setOptions(options);

	useEffect(() => {
		return virtualizer.init({
			onChange: reRender,
		});
	}, []);

	return {
		virtualItems: virtualizer.getVirtualItems(),
		totalSize: virtualizer.getTotalSize(),
	};
}
