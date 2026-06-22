import {
  getWheelFrame,
  getWheelPositions,
  type ColumnSpin,
} from "@shared/odometer";
import styled from "@emotion/styled";
import { memo, useEffect, useRef, useState } from "react";

const Digit = styled.div<{ narrow?: boolean }>`
  display: inline-block;
  overflow: hidden;
  width: ${({ narrow = false }) => (narrow ? "0.4em" : "0.52em")};
  height: 1em;
`;

const Wheel = styled.div`
  line-height: 1em;
  will-change: transform;
`;

const Char = styled.span`
  display: inline-block;
`;

interface OdometerDigitProps {
  digit: number;
  spin: ColumnSpin;
  durationMs: number;
  animationKey: number;
}

const easeDriveTrain = (progress: number): number => progress;

const OdometerDigit = memo(
  ({
    digit,
    spin,
    durationMs,
    animationKey,
  }: OdometerDigitProps): React.ReactElement => {
    const [strip, setStrip] = useState(String(digit));
    const [offsetEm, setOffsetEm] = useState(0);
    const rafRef = useRef<number>(undefined);

    useEffect(() => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      const { steps } = spin;

      if (steps === 0) {
        setStrip(String(digit));
        setOffsetEm(0);
        return;
      }

      const { start, end } = getWheelPositions(spin);
      const startTime = performance.now();

      const frame = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / durationMs);
        const eased = easeDriveTrain(progress);
        const position = start + (end - start) * eased;
        const { lines, offsetEm: nextOffset } = getWheelFrame(position);

        setStrip(lines.join("\n"));
        setOffsetEm(nextOffset);

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(frame);
        } else {
          setStrip(String(digit));
          setOffsetEm(0);
        }
      };

      rafRef.current = requestAnimationFrame(frame);

      return () => {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }, [digit, spin, durationMs, animationKey]);

    return (
      <Digit narrow={digit === 1}>
        <Wheel
          style={{
            transform: `translateY(${-offsetEm}em)`,
          }}
        >
          {strip}
        </Wheel>
      </Digit>
    );
  },
);

OdometerDigit.displayName = "OdometerDigit";

export const OdometerSymbol = ({ char }: { char: string }) => (
  <Char>{char}</Char>
);

export default OdometerDigit;
