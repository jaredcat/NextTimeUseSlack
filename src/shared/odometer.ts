export const maxFormattedLength = (
  format: (value: number) => string,
  ...values: number[]
): number => Math.max(0, ...values.map((value) => format(value).length));

export const DEFAULT_ODOMETER_DURATION_MS = 600;
export const MIN_ODOMETER_DURATION_MS = 400;
export const MAX_ODOMETER_DURATION_MS = 900;

export interface ColumnSpin {
  fromDigit: number;
  toDigit: number;
  steps: number;
  increasing: boolean;
}

const getDigitsLeftToRight = (formatted: string): number[] =>
  [...formatted].filter((char) => /\d/.test(char)).map(Number);

const digitAtLine = (line: number): number => ((line % 10) + 10) % 10;

/** Wheel line index for a continuous position (supports negative values). */
export const getWheelFrame = (
  position: number,
): { lines: [number, number, number]; offsetEm: number } => {
  const topLine = Math.floor(position);
  const offsetEm = position - topLine;

  return {
    lines: [
      digitAtLine(topLine),
      digitAtLine(topLine + 1),
      digitAtLine(topLine + 2),
    ],
    offsetEm,
  };
};

/** How many times each digit wheel ticks when counting from start to end in base-10 units. */
export const getColumnSpins = (
  startUnits: number,
  endUnits: number,
  digitCount: number,
): ColumnSpin[] => {
  const increasing = endUnits >= startUnits;

  return Array.from({ length: digitCount }, (_, left) => {
    const placePower = 10 ** (digitCount - 1 - left);
    const fromDigit = Math.floor(Math.abs(startUnits) / placePower) % 10;
    const toDigit = Math.floor(Math.abs(endUnits) / placePower) % 10;
    const steps = Math.abs(
      Math.floor(endUnits / placePower) - Math.floor(startUnits / placePower),
    );

    return { fromDigit, toDigit, steps, increasing };
  });
};

export const getWheelPositions = (
  spin: ColumnSpin,
): { start: number; end: number } => ({
  start: spin.fromDigit,
  end: spin.fromDigit + (spin.increasing ? spin.steps : -spin.steps),
});

export const getAnimationDuration = (
  columnSpins: ColumnSpin[],
): number => {
  const maxSteps = columnSpins.reduce(
    (max, column) => Math.max(max, column.steps),
    0,
  );

  if (maxSteps === 0) {
    return DEFAULT_ODOMETER_DURATION_MS;
  }

  // Large deltas get a bit more time, but stay snappy so columns feel linked.
  const scaled = MIN_ODOMETER_DURATION_MS + Math.log10(maxSteps + 1) * 80;
  return Math.min(
    MAX_ODOMETER_DURATION_MS,
    Math.max(MIN_ODOMETER_DURATION_MS, Math.round(scaled)),
  );
};

export const getDigitsLeftToRightFromFormatted = getDigitsLeftToRight;
