import { estimateDimensions as _estimateDimensions } from './estimate-dimensions';
import { getItemsInViewport } from './get-items-in-viewport';
import { memoizeOne } from './memoize-one';
import type { EstimateItemSize, GetElement } from './types';

export type CreateVirtualizerOptions = {
	count: number;
	getElement: GetElement;
	estimateItemSize: EstimateItemSize;
	threshold?: number;
};

export function createVirtualizer(initialOptions: CreateVirtualizerOptions) {
	let options = initialOptions;

	const estimateDimensions = memoizeOne({
		fn: _estimateDimensions,
		key: ({ count }) => String(count),
	});

	const init = ({ onChange }: { onChange: () => void }) => {
		const element = initialOptions.getElement();

		if (!element) {
			return;
		}

		// Trigger initial virtualized render.
		onChange();

		element.addEventListener('scroll', onChange);

		return () => {
			element.removeEventListener('scroll', onChange);
		};
	};

	const setOptions = (newOptions: CreateVirtualizerOptions) => {
		options = newOptions;
	};

	const getVirtualItems = () => {
		const { items } = estimateDimensions({
			count: options.count,
			estimateItemSize: initialOptions.estimateItemSize,
		});

		return getItemsInViewport({
			items,
			getElement: options.getElement,
			threshold: options.threshold,
		});
	};

	const getTotalSize = () => {
		const { totalSize } = estimateDimensions({
			count: options.count,
			estimateItemSize: options.estimateItemSize,
		});

		return totalSize;
	};

	return {
		init,
		setOptions,
		getVirtualItems,
		getTotalSize,
	};
}
