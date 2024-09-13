import { useEffect, useReducer, useState } from 'react';
import { createVirtualizer, type CreateVirtualizerOptions } from '../core';

export type UseVirtualizeOptions = CreateVirtualizerOptions;

export function useVirtualize(options: UseVirtualizeOptions) {
	const [, reRender] = useReducer(() => ({}), {});

	const [virtualizer] = useState(() => createVirtualizer(options));

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
