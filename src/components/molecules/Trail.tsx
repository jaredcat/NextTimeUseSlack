import { a, useTrail } from "@react-spring/web";
import { Children, type FC, type ReactNode } from "react";

const trailConfig = { mass: 8, tension: 2000, friction: 250 };

const Trail: FC<{
  open: boolean;
  children: ReactNode;
  onStarted?(): void;
}> = ({ open, children, onStarted }) => {
  const items = Children.toArray(children);
  const trail = useTrail(items.length, {
    config: trailConfig,
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
    onStart: () => onStarted?.(),
  });

  return (
    <>
      {trail.map(({ height, ...style }, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: trail items are stable and index-aligned
        <a.div key={i} style={style}>
          <a.div>{items[i]}</a.div>
        </a.div>
      ))}
    </>
  );
};

export default Trail;
