# Revirtualize

Tiny, framework-agnostic & headless list virtualization library.

## Usage

Revirtualize is a library that allows you to render virtualized lists in a framework agnostic way. It is designed to be
used with any framework or library that can render components.

The API is pretty similar to [TanStack Virtual](https://tanstack.com/virtual/latest) - You pass your scrollable container,
the total number of items, and a function that estimates the size of each item, and get a list of items that should be rendered
based on the current scroll position.

### Basic Example with React

Since the Core library contains a low-level API with the bare-bones logic to virtualize a list, you shouldn't use it directly
unless you're a library author. Instead, use an adapter for your framework of choice. Currently, there is only an adapter for
React:

```tsx
import { useVirtualize } from 'revirtualize/react';

// Create a huge list of items.
const items = Array(100000)
  .fill(null)
  .map(() => Math.random());

export default function App() {
  // Hold a reference to the scrollable container.
  const ref = useRef<HTMLDivElement>(null);

  // Pass the relevant information to Revirtualize.
  const { virtualItems, totalSize } = useVirtualize({
    getElement: () => ref.current,
    estimateItemSize: () => 40,
    count: items.length,
  });

  return (
    <div
      ref={ref}
      // Make the container scrollable.
      style={{ height: '500px', width: '300px', overflow: 'auto' }}
    >
      <div
        style={{
          // Set the height of the inner container that will hold the virtualized items.
          height: `${totalSize}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Render the list of the virtual items. */}
        {virtualItems.map(({ index, start, size }) => (
          <div
            key={index}
            style={{
              // Position each virtual item based on its start position and estimated size.
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: `${size}px`,
              transform: `translateY(${start}px)`,
            }}
          >
            Row {index} - {items[index]}
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Estimating Item Size

The `estimateItemSize` function can accept an argument that represents the index of the item, which will allow you to
have different sizes for different items. For example, you can have a list of items where even items have a height of `40`
and odd items have a height of `80`:

```tsx
const { virtualItems, totalSize } = useVirtualize({
  getElement: () => ref.current,
  estimateItemSize: (index) => (index % 2 === 0 ? 40 : 80),
  count: items.length,
});
```

### Setting a Threshold

You can also pass a `threshold` option to `useVirtualize` to specify how many items should be rendered before and after
the visible area. This can be useful if you want to preload some items before they become visible (the default is `5`):

```tsx
const { virtualItems, totalSize } = useVirtualize({
  getElement: () => ref.current,
  estimateItemSize: () => 40,
  count: items.length,
  threshold: 10,
});
```
