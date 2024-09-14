import { useMemo, useState } from 'react';
import { Virtualized } from './components/virtualized';
import { NotVirtualized } from './components/not-virtualized';

export default function App() {
	const [count, setCount] = useState(1000);
	const [threshold, setThreshold] = useState(6);
	const [isVirtualized, setIsVirtualized] = useState(true);

	const items = useMemo(
		() => Array(count).fill(null).map(randomString),
		[count],
	);

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

				<label htmlFor="virtualize">
					Virtualize:
					<input
						type="checkbox"
						id="virtualize"
						checked={isVirtualized}
						onChange={(e) => {
							setIsVirtualized(e.target.checked);
						}}
					/>
				</label>
			</div>

			{isVirtualized ? (
				<Virtualized
					items={items}
					itemSize={40}
					threshold={threshold}
				/>
			) : (
				<NotVirtualized items={items} itemSize={40} />
			)}
		</>
	);
}

function randomString() {
	return Math.random().toString(16).slice(2);
}
