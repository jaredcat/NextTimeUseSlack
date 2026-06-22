import { TextButton, TextRow } from "@atoms";
import { MODES, sizes, usdFormatter } from "@constants";
import { Odometer, Trail } from "@molecules";
import { isValidNumber } from "@shared/params";
import { HighlightedText } from "@shared/styles";
import { bool, func, number } from "prop-types";
import { type ReactElement, useEffect, useState } from "react";

interface TimerProps {
  burnMin: number;
  seconds: number;
  setSeconds(seconds: (prevSeconds: number) => number): void;
  setMode(mode: string): void;
  contentOpen: boolean;
}

const formatSecsToMins = (seconds: number): string => {
  const safeSeconds = isValidNumber(seconds) ? Math.max(0, seconds) : 0;
  return new Date(safeSeconds * 1000).toISOString().slice(11, 19);
};

const formatCurrency = (value: number): string => usdFormatter.format(value);

const Timer = ({
  burnMin,
  seconds,
  setSeconds,
  setMode,
  contentOpen,
}: TimerProps): ReactElement => {
  const safeBurnMin = isValidNumber(burnMin) ? burnMin : 0;
  const safeSeconds = isValidNumber(seconds) ? seconds : 0;
  const [totalBurned, setTotalBurned] = useState(
    () => (safeBurnMin / 60) * safeSeconds,
  );

  useEffect(() => {
    setTotalBurned((safeBurnMin / 60) * safeSeconds);
  }, [safeBurnMin, safeSeconds]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds: number) => prevSeconds + 1);
      setTotalBurned(
        (prevTotal) => prevTotal + (isValidNumber(burnMin) ? burnMin : 0) / 60,
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [burnMin, setSeconds]);

  return (
    <Trail open={contentOpen}>
      <TextRow>
        BURNS AT{" "}
        <HighlightedText>
          <Odometer format={formatCurrency} value={safeBurnMin} />
        </HighlightedText>{" "}
        A MIN
      </TextRow>
      <TextRow>
        FOR{" "}
        <HighlightedText>
          <Odometer
            decimals={0}
            format={formatSecsToMins}
            value={safeSeconds}
          />
        </HighlightedText>
      </TextRow>
      <TextRow>
        <HighlightedText fontSize="4rem">
          <Odometer format={formatCurrency} value={totalBurned} />
        </HighlightedText>
      </TextRow>
      <TextRow>HAS BEEN BURNT</TextRow>
      <TextButton
        type="button"
        fontSize={sizes.buttonFontSize}
        onClick={() => {
          setMode(MODES.STATIC);
        }}
      >
        ENTER VALUES MANUALLY
      </TextButton>
    </Trail>
  );
};

Timer.propTypes = {
  burnMin: number.isRequired,
  seconds: number.isRequired,
  setSeconds: func.isRequired,
  setMode: func.isRequired,
  contentOpen: bool.isRequired,
};

export default Timer;
