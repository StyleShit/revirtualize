import { useRef } from 'react';
import { useVirtualize } from '../src/react';

const items = Array(100000)
	.fill(null)
	.map(() => Math.random());

export default function App() {
	const ref = useRef<HTMLDivElement>(null);

	const { virtualItems, totalSize } = useVirtualize({
		getElement: () => ref.current,
		estimateItemSize: () => 40,
		count: items.length,
		threshold: 6,
	});

	return (
		<>
			<h1>Revirtualize</h1>

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
