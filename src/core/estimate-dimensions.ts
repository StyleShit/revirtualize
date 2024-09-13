import type { EstimateItemSize, VirtualItem } from './types';

export type EstimateDimensionsArgs = {
	count: number;
	estimateItemSize: EstimateItemSize;
};

export type EstimatedDimensions = {
	items: VirtualItem[];
	totalSize: number;
};

export function estimateDimensions({
	count,
	estimateItemSize: estimateSize,
}: EstimateDimensionsArgs): EstimatedDimensions {
	return Array(count)
		.fill(null)
		.reduce<EstimatedDimensions>(
			(acc, _, index) => {
				const size = estimateSize(index);

				acc.items[index] = {
					index,
					size,
					start: acc.totalSize,
					end: acc.totalSize + size,
				};

				acc.totalSize += size;

				return acc;
			},
			{ items: [], totalSize: 0 },
		);
}
