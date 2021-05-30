/* eslint-disable react/no-array-index-key */
import { bool, arrayOf, node, func, number } from "prop-types";
import { Children, ReactNode, FC } from "react";
import { useTrail, a } from "@react-spring/web";

const Trail: FC<{
  open: boolean;
  children: ReactNode;
  setStarted?(done: boolean): void;
}> = ({ open, children, setStarted }) => {
  const items = Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 8, tension: 2000, friction: 250 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
    onStart: () => setStarted(true),
  });
  return (
    <>
      {trail.map(({ height, ...style }, i) => (
        <a.div key={i} style={style}>
          <a.div>{items[i]}</a.div>
        </a.div>
      ))}
    </>
  );
};

Trail.propTypes = {
  open: bool.isRequired,
  children: arrayOf(node).isRequired,
  setStarted: func,
};

Trail.defaultProps = {
  setStarted: () => null,
};

export default Trail;
