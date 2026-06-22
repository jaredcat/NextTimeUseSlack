import styled from "@emotion/styled";
import {
  getWheelFrame,
  getWheelPositions,
  type ColumnSpin,
} from "@shared/odometer";
import { memo, useEffect, useRef, useState } from "react";

const Digit = styled.div`
  display: inline-block;
  font-variant-numeric: tabular-nums;
  height: 1em;
  isolation: isolate;
  max-height: 1em;
  overflow: hidden;
  position: relative;
  vertical-align: top;
  width: 0.5em;
`;

const Wheel = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1em;
  will-change: transform;
`;

const WheelLine = styled.span`
  display: block;
  flex: 0 0 1em;
  height: 1em;
  line-height: 1em;
  overflow: hidden;
  text-align: center;
  width: 100%;
`;

const Char = styled.span`
  display: inline-block;
`;

interface OdometerDigitProps {
  digit: number;
  spin: ColumnSpin;
  durationMs: number;
  animationKey: number;
  continuous?: boolean;
  wheelPosition?: number;
}

const WheelStrip = ({
  lines,
  offsetEm,
}: {
  lines: [number, number, number];
  offsetEm: number;
}) => (
  <Wheel
    style={{
      transform: `translateY(${-offsetEm}em)`,
    }}
  >
    {lines.map((line, index) => (
      <WheelLine key={`${line}-${index}`}>{line}</WheelLine>
    ))}
  </Wheel>
);

const OdometerDigit = memo(
  ({
    digit,
    spin,
    durationMs,
    animationKey,
    continuous = false,
    wheelPosition = 0,
  }: OdometerDigitProps): React.ReactElement => {
    const [lines, setLines] = useState<[number, number, number]>([
      digit,
      (digit + 1) % 10,
      (digit + 2) % 10,
    ]);
    const [offsetEm, setOffsetEm] = useState(0);
    const rafRef = useRef<number>(undefined);

    useEffect(() => {
      if (continuous) {
        return;
      }

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      const { steps } = spin;

      if (steps === 0) {
        setLines([digit, (digit + 1) % 10, (digit + 2) % 10]);
        setOffsetEm(0);
        return;
      }

      const { start, end } = getWheelPositions(spin);
      const startTime = performance.now();

      const frame = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        const position = start + (end - start) * progress;
        const frameState = getWheelFrame(position);

        setLines(frameState.lines);
        setOffsetEm(frameState.offsetEm);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(frame);
        } else {
          setLines([digit, (digit + 1) % 10, (digit + 2) % 10]);
          setOffsetEm(0);
        }
      };

      rafRef.current = requestAnimationFrame(frame);

      return () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }, [digit, spin, durationMs, animationKey, continuous]);

    if (continuous) {
      const frameState = getWheelFrame(wheelPosition);

      return (
        <Digit>
          <WheelStrip lines={frameState.lines} offsetEm={frameState.offsetEm} />
        </Digit>
      );
    }

    return (
      <Digit>
        <WheelStrip lines={lines} offsetEm={offsetEm} />
      </Digit>
    );
  },
);

OdometerDigit.displayName = "OdometerDigit";

export const OdometerSymbol = ({ char }: { char: string }) => (
  <Char>{char}</Char>
);

export default OdometerDigit;
