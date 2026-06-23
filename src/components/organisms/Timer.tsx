import { TextButton, TextRow } from "@atoms";
import { MODES, sizes, usdFormatter } from "@constants";
import { Odometer, Trail } from "@molecules";
import {
  DEFAULT_ODOMETER_DURATION_MS,
  getTimeDigitWheelPosition,
} from "@shared/odometer";
import { isValidNumber } from "@shared/params";
import { HeroText, HighlightedText } from "@shared/styles";
import { bool, func, number } from "prop-types";
import {
  type ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface TimerProps {
  burnMin: number;
  seconds: number;
  setSeconds(seconds: (prevSeconds: number) => number): void;
  setMode(mode: string): void;
  contentOpen: boolean;
}

const formatSecsToMins = (seconds: number): string => {
  const safeSeconds = isValidNumber(seconds) ? Math.max(0, seconds) : 0;
  return new Date(Math.floor(safeSeconds) * 1000).toISOString().slice(11, 19);
};

const formatCurrency = (value: number): string => usdFormatter.format(value);

interface TotalTransition {
  fromTotal: number;
  startedAt: number;
  durationMs: number;
}

const Timer = ({
  burnMin,
  seconds,
  setSeconds,
  setMode,
  contentOpen,
}: TimerProps): ReactElement => {
  const safeBurnMin = isValidNumber(burnMin) ? burnMin : 0;
  const safeSeconds = isValidNumber(seconds) ? seconds : 0;
  const burnRateSec = safeBurnMin / 60;
  const [smooth, setSmooth] = useState(false);
  const [displaySeconds, setDisplaySeconds] = useState(safeSeconds);
  const [totalBurned, setTotalBurned] = useState(
    () => burnRateSec * safeSeconds,
  );
  const smoothOriginRef = useRef({
    startedAt: 0,
    seconds: safeSeconds,
    totalBurned: burnRateSec * safeSeconds,
  });
  const rafRef = useRef<number>(undefined);
  const urlSyncRef = useRef<ReturnType<typeof setInterval>>(undefined);
  const displaySecondsRef = useRef(displaySeconds);
  const totalBurnedRef = useRef(totalBurned);
  const burnRateSecRef = useRef(burnRateSec);
  const prevBurnRateSecRef = useRef(burnRateSec);
  const totalTransitionRef = useRef<TotalTransition | null>(null);

  displaySecondsRef.current = displaySeconds;
  totalBurnedRef.current = totalBurned;
  burnRateSecRef.current = burnRateSec;

  const reanchorSmooth = useCallback(() => {
    const now = performance.now();
    const rate = burnRateSec;
    const prevRate = prevBurnRateSecRef.current;
    const { startedAt, seconds: originSeconds } = smoothOriginRef.current;

    const currentSeconds =
      startedAt > 0
        ? originSeconds + (now - startedAt) / 1000
        : displaySecondsRef.current;

    const targetTotal = rate * currentSeconds;
    const rateChanged =
      startedAt > 0 && Math.abs(rate - prevRate) > Number.EPSILON;

    if (rateChanged) {
      totalTransitionRef.current = {
        fromTotal: totalBurnedRef.current,
        startedAt: now,
        durationMs: DEFAULT_ODOMETER_DURATION_MS,
      };
    } else {
      totalTransitionRef.current = null;
    }

    smoothOriginRef.current = {
      startedAt: now,
      seconds: currentSeconds,
      totalBurned: rateChanged ? totalBurnedRef.current : targetTotal,
    };
    prevBurnRateSecRef.current = rate;
    setDisplaySeconds(currentSeconds);
    setTotalBurned(rateChanged ? totalBurnedRef.current : targetTotal);
  }, [burnRateSec]);

  useEffect(() => {
    if (smooth) {
      return;
    }

    setDisplaySeconds(safeSeconds);
    setTotalBurned(burnRateSec * safeSeconds);
  }, [safeSeconds, burnRateSec, smooth]);

  useEffect(() => {
    if (smooth) {
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prevSeconds: number) => prevSeconds + 1);
      setTotalBurned((prevTotal) => prevTotal + burnRateSec);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [burnRateSec, setSeconds, smooth]);

  useEffect(() => {
    if (!smooth) {
      smoothOriginRef.current.startedAt = 0;
      totalTransitionRef.current = null;
      prevBurnRateSecRef.current = burnRateSecRef.current;
      return;
    }

    reanchorSmooth();
  }, [reanchorSmooth, smooth]);

  useEffect(() => {
    if (!smooth) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (urlSyncRef.current) {
        clearInterval(urlSyncRef.current);
      }
      return;
    }

    const tick = (now: number) => {
      const elapsedSec = (now - smoothOriginRef.current.startedAt) / 1000;
      const rate = burnRateSecRef.current;
      const currentSeconds = smoothOriginRef.current.seconds + elapsedSec;
      const transition = totalTransitionRef.current;
      let nextTotal = smoothOriginRef.current.totalBurned + rate * elapsedSec;

      if (transition) {
        const progress = Math.min(
          1,
          (now - transition.startedAt) / transition.durationMs,
        );
        const eased = progress * (2 - progress);
        const repricedTotal = rate * currentSeconds;
        nextTotal =
          transition.fromTotal + (repricedTotal - transition.fromTotal) * eased;

        if (progress >= 1) {
          totalTransitionRef.current = null;
          smoothOriginRef.current = {
            startedAt: now,
            seconds: currentSeconds,
            totalBurned: repricedTotal,
          };
          nextTotal = repricedTotal;
        }
      }

      setDisplaySeconds(currentSeconds);
      setTotalBurned(nextTotal);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    urlSyncRef.current = globalThis.setInterval(() => {
      const elapsedSec =
        (performance.now() - smoothOriginRef.current.startedAt) / 1000;
      const nextSeconds = Math.floor(
        smoothOriginRef.current.seconds + elapsedSec,
      );
      setSeconds(() => nextSeconds);
    }, 1000);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (urlSyncRef.current) {
        clearInterval(urlSyncRef.current);
      }
    };
  }, [smooth, setSeconds]);

  const toggleSmooth = () => {
    if (smooth) {
      const elapsedSec =
        (performance.now() - smoothOriginRef.current.startedAt) / 1000;
      const settledSeconds = Math.floor(
        smoothOriginRef.current.seconds + elapsedSec,
      );
      setSeconds(() => settledSeconds);
      setDisplaySeconds(settledSeconds);
      setTotalBurned(burnRateSec * settledSeconds);
    }

    setSmooth((enabled) => !enabled);
  };

  return (
    <Trail open={contentOpen}>
      <TextRow>
        BURNS AT{" "}
        <HighlightedText>
          <Odometer
            continuous={smooth}
            format={formatCurrency}
            value={safeBurnMin}
          />
        </HighlightedText>{" "}
        A MIN
      </TextRow>
      <TextRow>
        FOR{" "}
        <HighlightedText>
          <Odometer
            continuous={smooth}
            decimals={0}
            format={formatSecsToMins}
            value={displaySeconds}
            wheelPositionAt={(digitPlace, currentSeconds) =>
              getTimeDigitWheelPosition(digitPlace, currentSeconds)
            }
          />
        </HighlightedText>
      </TextRow>
      <TextRow>
        <HeroText>
          <Odometer
            continuous={smooth}
            format={formatCurrency}
            value={totalBurned}
          />
        </HeroText>
      </TextRow>
      <TextRow>HAS BEEN BURNT</TextRow>
      <TextButton
        type="button"
        fontSize={sizes.buttonFontSize}
        onClick={toggleSmooth}
      >
        {smooth ? "SMOOTH: ON" : "SMOOTH: OFF"}
      </TextButton>
      <TextButton
        type="button"
        fontSize={sizes.buttonFontSize}
        onClick={() => {
          setMode(MODES.STATIC);
        }}
      >
        CALCULATOR MODE
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
