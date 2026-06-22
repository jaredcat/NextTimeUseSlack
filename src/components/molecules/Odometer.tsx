import { OdometerDigit, OdometerSymbol } from "@atoms";
import {
  DEFAULT_ODOMETER_DURATION_MS,
  getAnimationDuration,
  getColumnSpins,
  getDigitsLeftToRightFromFormatted,
  type ColumnSpin,
} from "@shared/odometer";
import { useEffect, useRef, useState } from "react";

interface OdometerProps {
  value: number;
  format?: (value: number) => string;
  duration?: number;
  decimals?: number;
}

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
}: OdometerProps): React.ReactElement => {
  const [displayValue, setDisplayValue] = useState(value);
  const [columnSpins, setColumnSpins] = useState<ColumnSpin[]>(() =>
    getDigitsLeftToRightFromFormatted(format(value)).map(idleSpin),
  );
  const [animDurationMs, setAnimDurationMs] = useState(duration);
  const [animationKey, setAnimationKey] = useState(0);
  const displayRef = useRef(value);

  useEffect(() => {
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
  }, [value, duration, decimals, format]);

  const formatted = format(displayValue);
  let digitPlace = -1;
  let symbolPlace = -1;

  return (
    <>
      {formatted.split("").map((char) => {
        if (!/\d/.test(char)) {
          symbolPlace += 1;
          return <OdometerSymbol char={char} key={`sym-${symbolPlace}`} />;
        }

        digitPlace += 1;
        return (
          <OdometerDigit
            animationKey={animationKey}
            digit={Number(char)}
            durationMs={animDurationMs}
            key={`place-${digitPlace}`}
            spin={columnSpins[digitPlace] ?? idleSpin(Number(char))}
          />
        );
      })}
    </>
  );
};

export default Odometer;
