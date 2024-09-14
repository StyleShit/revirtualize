import type { GetElement, VirtualItem } from './types';

export type GetItemsInViewportArgs = {
	items: VirtualItem[];
	getElement: GetElement;
	threshold?: number;
};

export function getItemsInViewport({
	items,
	getElement,
	threshold = 5,
}: GetItemsInViewportArgs): VirtualItem[] {
	const element = getElement();

	if (!element) {
		return [];
	}

	const scroll = element.scrollTop || 0;
	const height = element.clientHeight || 0;

	let startIdx: number | null = null;
	let endIdx: number | null = null;

	for (let i = 0; i < items.length; i++) {
		const { start, end } = items[i] as VirtualItem;

		const isStartingInViewport = start >= scroll && start < scroll + height;

		const isEndingInViewport = end > scroll && end <= scroll + height;

		const isInViewport = isStartingInViewport || isEndingInViewport;

		if (isInViewport && startIdx === null) {
			startIdx = i;
		}

		const isEndOfViewport = end >= scroll + height;

		if (isEndOfViewport) {
			endIdx = i;
			break;
		}
	}

	startIdx ??= 0;
	endIdx ??= items.length - 1;

	const startWithThreshold = Math.max(startIdx - threshold, 0);
	const endWithThreshold = endIdx + 1 + threshold;

	return items.slice(startWithThreshold, endWithThreshold);
}
