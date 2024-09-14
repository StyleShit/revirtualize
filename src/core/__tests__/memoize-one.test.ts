import { describe, expect, it, vi } from 'vitest';
import { memoizeOne } from '../memoize-one';

describe('memoizeOne', () => {
	it('should memoize the last result of a function based on a cache key', () => {
		// Arrange.
		const mockFn = vi.fn();

		const fn = (a: number, b: number) => {
			mockFn();

			return a + b;
		};

		// Act.
		const memoizedFn = memoizeOne({
			fn,
			key: (a, b) => `${String(a)}-${String(b)}`,
		});

		const result1 = memoizedFn(1, 2);
		const result2 = memoizedFn(1, 2);

		// Assert.
		expect(result1).toBe(3);
		expect(result2).toBe(3);
		expect(mockFn).toHaveBeenCalledTimes(1);

		// Act.
		const result3 = memoizedFn(1, 3);
		const result4 = memoizedFn(1, 3);

		// Assert.
		expect(result3).toBe(4);
		expect(result4).toBe(4);
		expect(mockFn).toHaveBeenCalledTimes(2);
	});

	it('should keep only the last result in cache', () => {
		// Arrange.
		const mockFn = vi.fn();

		const fn = (a: number, b: number) => {
			mockFn();

			return a + b;
		};

		// Act.
		const memoizedFn = memoizeOne({
			fn,
			key: (a, b) => `${String(a)}-${String(b)}`,
		});

		memoizedFn(1, 2);
		memoizedFn(1, 3);
		memoizedFn(1, 2);

		// Assert.
		expect(mockFn).toHaveBeenCalledTimes(3);
	});
});
