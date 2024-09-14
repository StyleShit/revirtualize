import { useMemo, useRef, useState } from 'react';
import { useVirtualize } from '../src/react';

export default function App() {
	const ref = useRef<HTMLDivElement>(null);

	const [count, setCount] = useState(100000);
	const [threshold, setThreshold] = useState(6);

	const items = useMemo(
		() =>
			Array(count)
				.fill(null)
				.map(() => Math.random()),
		[count],
	);

	const { virtualItems, totalSize } = useVirtualize({
		getElement: () => ref.current,
		estimateItemSize: () => 40,
		count: items.length,
		threshold,
	});

	return (
		<>
			<h1>Revirtualize</h1>

			<div className="settings">
				<label htmlFor="count">
					Count:
					<input
						type="number"
						id="count"
						value={count}
						onChange={(e) => {
							setCount(e.target.valueAsNumber);
						}}
					/>
				</label>

				<label htmlFor="threshold">
					Threshold:
					<input
						type="number"
						id="threshold"
						value={threshold}
						onChange={(e) => {
							setThreshold(e.target.valueAsNumber);
						}}
					/>
				</label>
			</div>

			<div
				ref={ref}
				style={{ height: '500px', width: '300px', overflow: 'auto' }}
			>
				<div
					style={{
						height: `${String(totalSize)}px`,
						width: '100%',
						position: 'relative',
					}}
				>
					{virtualItems.map(({ index, start, size }) => (
						<div
							key={index}
							style={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: `${String(size)}px`,
								transform: `translateY(${String(start)}px)`,
							}}
						>
							Row {index} - {items[index]}
						</div>
					))}
				</div>
			</div>
		</>
	);
}
