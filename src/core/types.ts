export type VirtualItem = {
	index: number;
	start: number;
	end: number;
	size: number;
};

export type GetElement = () => HTMLElement | null;

export type EstimateItemSize = (index: number) => number;
