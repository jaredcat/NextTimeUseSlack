import { OdometerDigit, OdometerSymbol } from "@atoms";
import { sizes } from "@constants";
import styled from "@emotion/styled";
import {
  type ColumnSpin,
  DEFAULT_ODOMETER_DURATION_MS,
  getAnimationDuration,
  getColumnSpins,
  getCurrencyWheelPosition,
  getDigitsLeftToRightFromFormatted,
} from "@shared/odometer";
import { useEffect, useRef, useState } from "react";

interface OdometerProps {
  value: number;
  format?: (value: number) => string;
  duration?: number;
  decimals?: number;
  continuous?: boolean;
  wheelPositionAt?: (
    digitPlace: number,
    value: number,
    digitCount: number,
  ) => number;
}

const OdometerFrame = styled.span`
  font-variant-numeric: tabular-nums;
  max-width: 100%;

  @media (max-width: ${sizes.small.mediaQuery}) {
    display: inline-block;
    overflow-x: auto;
    vertical-align: bottom;
  }
`;

const toUnits = (value: number, decimals: number): number =>
  Math.round(value * 10 ** decimals);

const idleSpin = (digit: number): ColumnSpin => ({
  fromDigit: digit,
  toDigit: digit,
  steps: 0,
  increasing: true,
});

const Odometer = ({
  value,
  format = String,
  duration = DEFAULT_ODOMETER_DURATION_MS,
  decimals = 2,
  continuous = false,
  wheelPositionAt,
}: OdometerProps): React.ReactElement => {
  const [displayValue, setDisplayValue] = useState(value);
  const [columnSpins, setColumnSpins] = useState<ColumnSpin[]>(() =>
    getDigitsLeftToRightFromFormatted(format(value)).map(idleSpin),
  );
  const [animDurationMs, setAnimDurationMs] = useState(duration);
  const [animationKey, setAnimationKey] = useState(0);
  const displayRef = useRef(value);

  useEffect(() => {
    if (continuous) {
      return;
    }

    const startUnits = toUnits(displayRef.current, decimals);
    const endUnits = toUnits(value, decimals);

    if (startUnits === endUnits) {
      return;
    }

    const endFormatted = format(value);
    const digitCount = getDigitsLeftToRightFromFormatted(endFormatted).length;
    const spins = getColumnSpins(startUnits, endUnits, digitCount);
    const animMs = getAnimationDuration(spins);

    setColumnSpins(spins);
    setAnimDurationMs(animMs);
    setDisplayValue(value);
    displayRef.current = value;
    setAnimationKey((key) => key + 1);
  }, [value, decimals, format, continuous]);

  const shownValue = continuous ? value : displayValue;
  const formatted = format(shownValue);
  const digitCount = getDigitsLeftToRightFromFormatted(formatted).length;
  const resolveWheelPosition =
    wheelPositionAt ??
    ((digitPlace: number, currentValue: number, count: number) =>
      getCurrencyWheelPosition(digitPlace, currentValue, count, decimals));

  let digitPlace = -1;
  let symbolPlace = -1;

  return (
    <OdometerFrame>
      {formatted.split("").map((char) => {
        if (!/\d/.test(char)) {
          symbolPlace += 1;
          return <OdometerSymbol char={char} key={`sym-${symbolPlace}`} />;
        }

        digitPlace += 1;
        return (
          <OdometerDigit
            continuous={continuous}
            digit={Number(char)}
            durationMs={animDurationMs}
            key={`place-${digitPlace}-${animationKey}`}
            spin={columnSpins[digitPlace] ?? idleSpin(Number(char))}
            wheelPosition={resolveWheelPosition(
              digitPlace,
              shownValue,
              digitCount,
            )}
          />
        );
      })}
    </OdometerFrame>
  );
};

export default Odometer;
