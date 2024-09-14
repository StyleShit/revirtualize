import { useRef } from 'react';
import { useVirtualize } from '../../src/react';

type Props = {
	items: string[];
	threshold: number;
	itemSize: number;
};

export function Virtualized({ items, threshold, itemSize }: Props) {
	const ref = useRef<HTMLDivElement>(null);

	const { virtualItems, totalSize } = useVirtualize({
		getElement: () => ref.current,
		estimateItemSize: () => itemSize,
		count: items.length,
		threshold,
	});

	return (
		<div ref={ref} className="list">
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
						VRow {index} - {items[index]}
					</div>
				))}
			</div>
		</div>
	);
}
