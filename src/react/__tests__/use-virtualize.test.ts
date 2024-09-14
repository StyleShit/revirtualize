import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useVirtualize } from '../';

describe('useVirtualize', () => {
	it('should return the total size of the list with fixed height', () => {
		// Act.
		const { result } = renderHook(() =>
			useVirtualize({
				count: 100,
				estimateItemSize: () => 40,
				getElement: () => createMockElement(),
			}),
		);

		// Assert.
		expect(result.current.totalSize).toBe(4000);
	});

	it('should return the total size of the list with variable height', () => {
		// Act.
		const { result } = renderHook(() =>
			useVirtualize({
				count: 100,
				estimateItemSize: (i) => (i % 2 === 0 ? 40 : 80),
				getElement: () => createMockElement(),
			}),
		);

		// Assert.
		expect(result.current.totalSize).toBe(6000);
	});

	it('should return empty virtual items when there is no element', () => {
		// Act.
		const { result } = renderHook(() =>
			useVirtualize({
				count: 100,
				estimateItemSize: () => 40,
				getElement: () => null,
			}),
		);

		// Assert.
		expect(result.current.virtualItems).toEqual([]);
	});

	it('should return the virtual items with default threshold when the element is scrolled to top', () => {
		// Arrange.
		const element = createMockElement({
			height: 100,
			scrollTop: 0,
		});

		// Act.
		const { result } = renderHook(() =>
			useVirtualize({
				count: 100,
				estimateItemSize: () => 50,
				getElement: () => element,
			}),
		);

		// Assert.
		expect(result.current.virtualItems).toHaveLength(7);

		expect(result.current.virtualItems).toEqual([
			{ index: 0, start: 0, end: 50, size: 50 },
			{ index: 1, start: 50, end: 100, size: 50 },
			{ index: 2, start: 100, end: 150, size: 50 },
			{ index: 3, start: 150, end: 200, size: 50 },
			{ index: 4, start: 200, end: 250, size: 50 },
			{ index: 5, start: 250, end: 300, size: 50 },
			{ index: 6, start: 300, end: 350, size: 50 },
		]);
	});

	it('should return the virtual items with custom threshold when the element is scrolled to top', () => {
		// Arrange.
		const element = createMockElement({
			height: 100,
			scrollTop: 0,
		});

		// Act.
		const { result } = renderHook(() =>
			useVirtualize({
				count: 100,
				threshold: 2,
				estimateItemSize: () => 10,
				getElement: () => element,
			}),
		);

		// Assert.
		expect(result.current.virtualItems).toHaveLength(12);

		expect(result.current.virtualItems).toEqual([
			{ index: 0, start: 0, end: 10, size: 10 },
			{ index: 1, start: 10, end: 20, size: 10 },
			{ index: 2, start: 20, end: 30, size: 10 },
			{ index: 3, start: 30, end: 40, size: 10 },
			{ index: 4, start: 40, end: 50, size: 10 },
			{ index: 5, start: 50, end: 60, size: 10 },
			{ index: 6, start: 60, end: 70, size: 10 },
			{ index: 7, start: 70, end: 80, size: 10 },
			{ index: 8, start: 80, end: 90, size: 10 },
			{ index: 9, start: 90, end: 100, size: 10 },
			{ index: 10, start: 100, end: 110, size: 10 },
			{ index: 11, start: 110, end: 120, size: 10 },
		]);
	});

	it('should return the virtual items with default threshold when the element is scrolled to bottom', () => {
		// Arrange.
		const element = createMockElement({
			height: 100,
			scrollTop: 900,
		});

		// Act.
		const { result } = renderHook(() =>
			useVirtualize({
				count: 100,
				estimateItemSize: () => 10,
				getElement: () => element,
			}),
		);

		// Assert.
		expect(result.current.virtualItems).toHaveLength(15);

		expect(result.current.virtualItems).toEqual([
			{ index: 85, start: 850, end: 860, size: 10 },
			{ index: 86, start: 860, end: 870, size: 10 },
			{ index: 87, start: 870, end: 880, size: 10 },
			{ index: 88, start: 880, end: 890, size: 10 },
			{ index: 89, start: 890, end: 900, size: 10 },
			{ index: 90, start: 900, end: 910, size: 10 },
			{ index: 91, start: 910, end: 920, size: 10 },
			{ index: 92, start: 920, end: 930, size: 10 },
			{ index: 93, start: 930, end: 940, size: 10 },
			{ index: 94, start: 940, end: 950, size: 10 },
			{ index: 95, start: 950, end: 960, size: 10 },
			{ index: 96, start: 960, end: 970, size: 10 },
			{ index: 97, start: 970, end: 980, size: 10 },
			{ index: 98, start: 980, end: 990, size: 10 },
			{ index: 99, start: 990, end: 1000, size: 10 },
		]);
	});

	it('should return the virtual items with custom threshold when the element is scrolled to bottom', () => {
		// Arrange.
		const element = createMockElement({
			height: 100,
			scrollTop: 900,
		});

		// Act.
		const { result } = renderHook(() =>
			useVirtualize({
				count: 100,
				threshold: 2,
				estimateItemSize: () => 10,
				getElement: () => element,
			}),
		);

		// Assert.
		expect(result.current.virtualItems).toHaveLength(12);

		expect(result.current.virtualItems).toEqual([
			{ index: 88, start: 880, end: 890, size: 10 },
			{ index: 89, start: 890, end: 900, size: 10 },
			{ index: 90, start: 900, end: 910, size: 10 },
			{ index: 91, start: 910, end: 920, size: 10 },
			{ index: 92, start: 920, end: 930, size: 10 },
			{ index: 93, start: 930, end: 940, size: 10 },
			{ index: 94, start: 940, end: 950, size: 10 },
			{ index: 95, start: 950, end: 960, size: 10 },
			{ index: 96, start: 960, end: 970, size: 10 },
			{ index: 97, start: 970, end: 980, size: 10 },
			{ index: 98, start: 980, end: 990, size: 10 },
			{ index: 99, start: 990, end: 1000, size: 10 },
		]);
	});

	it('should return the virtual items with default threshold when the element is scrolled to the middle', () => {
		// Arrange.
		const element = createMockElement({
			height: 100,
			scrollTop: 2500,
		});

		// Act.
		const { result } = renderHook(() =>
			useVirtualize({
				count: 100,
				estimateItemSize: () => 50,
				getElement: () => element,
			}),
		);

		// Assert.
		expect(result.current.virtualItems).toHaveLength(12);

		expect(result.current.virtualItems).toEqual([
			{ index: 45, start: 2250, end: 2300, size: 50 },
			{ index: 46, start: 2300, end: 2350, size: 50 },
			{ index: 47, start: 2350, end: 2400, size: 50 },
			{ index: 48, start: 2400, end: 2450, size: 50 },
			{ index: 49, start: 2450, end: 2500, size: 50 },
			{ index: 50, start: 2500, end: 2550, size: 50 },
			{ index: 51, start: 2550, end: 2600, size: 50 },
			{ index: 52, start: 2600, end: 2650, size: 50 },
			{ index: 53, start: 2650, end: 2700, size: 50 },
			{ index: 54, start: 2700, end: 2750, size: 50 },
			{ index: 55, start: 2750, end: 2800, size: 50 },
			{ index: 56, start: 2800, end: 2850, size: 50 },
		]);
	});

	it('should return the virtual items with custom threshold when the element is scrolled to the middle', () => {
		// Arrange.
		const element = createMockElement({
			height: 100,
			scrollTop: 2500,
		});

		// Act.
		const { result } = renderHook(() =>
			useVirtualize({
				count: 100,
				threshold: 2,
				estimateItemSize: () => 50,
				getElement: () => element,
			}),
		);

		// Assert.
		expect(result.current.virtualItems).toHaveLength(6);

		expect(result.current.virtualItems).toEqual([
			{ index: 48, start: 2400, end: 2450, size: 50 },
			{ index: 49, start: 2450, end: 2500, size: 50 },
			{ index: 50, start: 2500, end: 2550, size: 50 },
			{ index: 51, start: 2550, end: 2600, size: 50 },
			{ index: 52, start: 2600, end: 2650, size: 50 },
			{ index: 53, start: 2650, end: 2700, size: 50 },
		]);
	});

	it('should return the virtual items with custom threshold and variable size when the element is scrolled to the middle', () => {
		// Arrange.
		const element = createMockElement({
			height: 100,
			scrollTop: 300,
		});

		// Act.
		const { result } = renderHook(() =>
			useVirtualize({
				count: 10,
				threshold: 0,
				estimateItemSize: (i) => (i % 2 === 0 ? 50 : 100),
				getElement: () => element,
			}),
		);

		// Assert.
		expect(result.current.virtualItems).toHaveLength(2);

		expect(result.current.virtualItems).toEqual([
			{ index: 4, start: 300, end: 350, size: 50 },
			{ index: 5, start: 350, end: 450, size: 100 },
		]);
	});

	it('should return the virtual items when the element is scrolled to the middle of an item', () => {
		// Arrange.
		const element = createMockElement({
			height: 100,
			scrollTop: 120,
		});

		// Act.
		const { result } = renderHook(() =>
			useVirtualize({
				count: 10,
				threshold: 0,
				estimateItemSize: () => 50,
				getElement: () => element,
			}),
		);

		// Assert.
		expect(result.current.virtualItems).toHaveLength(3);

		expect(result.current.virtualItems).toEqual([
			{ index: 2, start: 100, end: 150, size: 50 },
			{ index: 3, start: 150, end: 200, size: 50 },
			{ index: 4, start: 200, end: 250, size: 50 },
		]);
	});

	it('should be reactive', () => {
		// Arrange.
		const element = createMockElement({
			height: 100,
			scrollTop: 100,
		});

		// Act.
		const { result, rerender } = renderHook(
			({ count, threshold }) =>
				useVirtualize({
					count,
					threshold,
					estimateItemSize: () => 50,
					getElement: () => element,
				}),
			{ initialProps: { count: 10, threshold: 0 } },
		);

		// Assert.
		expect(result.current.virtualItems).toHaveLength(2);

		// Act.
		rerender({ count: 5, threshold: 2 });

		// Assert.
		expect(result.current.virtualItems).toHaveLength(5);
	});
});

function createMockElement({
	height = 100,
	scrollTop = 0,
}: {
	height?: number;
	scrollTop?: number;
} = {}): HTMLDivElement {
	const element = document.createElement('div');

	Object.defineProperty(element, 'clientHeight', {
		get: () => height,
	});

	element.scrollTop = scrollTop;

	return element;
}
