import { TextButton, TextRow } from "@atoms";
import { MODES, sizes, usdFormatter } from "@constants";
import { Odometer, Trail } from "@molecules";
import { isValidNumber } from "@shared/params";
import { HighlightedText } from "@shared/styles";
import { bool, func, number } from "prop-types";
import { type ReactElement, useEffect, useRef } from "react";

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

const Timer = ({
  burnMin,
  seconds,
  setSeconds,
  setMode,
  contentOpen,
}: TimerProps): ReactElement => {
  const safeBurnMin = isValidNumber(burnMin) ? burnMin : 0;
  const safeSeconds = isValidNumber(seconds) ? seconds : 0;
  const burnRateSec = useRef(safeBurnMin / 60);
  const total = useRef((safeBurnMin / 60) * safeSeconds);

  const burnMinPretty = usdFormatter.format(safeBurnMin);

  useEffect(() => {
    burnRateSec.current = safeBurnMin / 60;
  }, [safeBurnMin]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds: number) => prevSeconds + 1);
      total.current += burnRateSec.current;
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [setSeconds]);

  return (
    <Trail open={contentOpen}>
      <TextRow>
        BURNS AT{" "}
        <HighlightedText>
          <Odometer text={burnMinPretty} />
        </HighlightedText>{" "}
        A MIN
      </TextRow>
      <TextRow>
        FOR{" "}
        <HighlightedText>
          <Odometer text={formatSecsToMins(safeSeconds)} />
        </HighlightedText>
      </TextRow>
      <TextRow>
        <HighlightedText fontSize="4rem">
          <Odometer text={usdFormatter.format(total.current)} />
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
