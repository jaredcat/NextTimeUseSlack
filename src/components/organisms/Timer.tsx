import { ReactElement, useEffect, useRef } from "react";
import { number, func, bool } from "prop-types";
import { usdFormatter, MODES, sizes } from "@constants";
import { HighlightedText } from "@shared/styles";
import { TextButton, TextRow } from "@atoms";
import { Trail, Odometer } from "@molecules";
import useStartChildAnimation from "@hooks";

interface TimerProps {
  burnMin: number;
  seconds: number;
  setSeconds(seconds: (prevSeconds: number) => number): void;
  setMode(mode: string): void;
  parentAnimationStarted: boolean;
}

const formatSecsToMins = (seconds: number): string =>
  new Date(seconds * 1000).toISOString().substr(11, 8);

const Timer = ({
  burnMin,
  seconds,
  setSeconds,
  setMode,
  parentAnimationStarted,
}: TimerProps): ReactElement => {
  const open = useStartChildAnimation({ parentAnimationStarted, delay: 130 });
  const burnRateSec = useRef(burnMin / 60);
  const total = useRef(burnRateSec.current * seconds || 0);

  const burnMinPretty = usdFormatter.format(burnMin);

  useEffect(() => {
    burnRateSec.current = burnMin / 60;
  }, [burnMin]);

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
    <Trail open={open}>
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
          <Odometer text={formatSecsToMins(seconds)} />
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
  parentAnimationStarted: bool.isRequired,
};

export default Timer;
