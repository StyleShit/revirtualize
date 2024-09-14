export type MemoizeOneArgs<T extends (...args: any[]) => any> = {
	fn: T;
	key: (...args: Parameters<NoInfer<T>>) => string;
};

/**
 * Memoize the last result of a function based on a cache key that represents the dependencies.
 * Similar to `useMemo`, but outside of React.
 */
export function memoizeOne<T extends (...args: any[]) => any>({
	fn,
	key,
}: MemoizeOneArgs<T>) {
	let cache: ReturnType<T>;
	let cacheKey: string;

	return (...args: Parameters<T>): ReturnType<T> => {
		const newCacheKey = key(...args);

		if (cacheKey !== newCacheKey) {
			cacheKey = newCacheKey;
			cache = fn(...args) as ReturnType<T>;
		}

		return cache;
	};
}
