import { estimateDimensions } from './estimate-dimensions';
import { getItemsInViewport } from './get-items-in-viewport';
import type { EstimateItemSize, GetElement } from './types';

export type CreateVirtualizerOptions = {
	count: number;
	getElement: GetElement;
	estimateItemSize: EstimateItemSize;
	threshold?: number;
};

export function createVirtualizer(options: CreateVirtualizerOptions) {
	const init = ({ onChange }: { onChange: () => void }) => {
		const element = options.getElement();

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

	const { items, totalSize } = estimateDimensions({
		count: options.count,
		estimateItemSize: options.estimateItemSize,
	});

	const getVirtualItems = () => {
		return getItemsInViewport({
			items,
			getElement: options.getElement,
			threshold: options.threshold,
		});
	};

	const getTotalSize = () => totalSize;

	return {
		init,
		getVirtualItems,
		getTotalSize,
	};
}
