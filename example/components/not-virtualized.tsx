type Props = {
	items: string[];
	itemSize: number;
};

export function NotVirtualized({ items, itemSize }: Props) {
	return (
		<div className="list">
			{items.map((item, index) => (
				<div key={index} style={{ height: itemSize }}>
					Row {index} - {item}
				</div>
			))}
		</div>
	);
}
