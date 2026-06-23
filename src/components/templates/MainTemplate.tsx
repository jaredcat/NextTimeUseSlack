import { DiscreetInput, TextButton, TextRow, Tooltip } from "@atoms";
import { MINS_A_YEAR, MODES, sizes, usdFormatter } from "@constants";
import styled from "@emotion/styled";
import { ResetButton, Trail, ZoomModeToast } from "@molecules";
import { Static, Timer } from "@organisms";
import { maxFormattedLength } from "@shared/odometer";
import { isValidNumber } from "@shared/params";
import { bool, func, number, string } from "prop-types";
import { type ReactElement, useEffect, useRef, useState } from "react";

const formatCurrency = (value: number): string => usdFormatter.format(value);

const OBS_URL = "https://obsproject.com/";

const PageContent = styled.div<{ $minWidth: string; $zoomMode: boolean }>`
  box-sizing: border-box;
  max-width: 100%;
  min-width: ${({ $minWidth }) => $minWidth};
  position: relative;
  width: max-content;

  ${({ $zoomMode }) =>
    $zoomMode
      ? `
    margin-right: auto;
    text-align: left;
  `
      : ""}

  @media (max-width: ${sizes.small.mediaQuery}) {
    min-width: 0;
    width: 100%;
  }
`;

interface MainProps {
  mode: string;
  setMode(mode: MODES): void;
  people: number;
  setPeople(people: number): void;
  salary: number;
  setSalary(salary: number): void;
  seconds: number;
  setSeconds(seconds: number | ((prevSeconds: number) => number)): void;
  resetState(): void;
  isLoaded: boolean;
  zoomMode: boolean;
  setZoomMode(zoomMode: boolean): void;
}

const MainTemplate = ({
  mode = MODES.STATIC,
  people,
  salary,
  seconds,
  setMode,
  setPeople,
  setSalary,
  setSeconds,
  resetState,
  isLoaded,
  zoomMode,
  setZoomMode,
}: MainProps): ReactElement => {
  const safePeople = isValidNumber(people) ? people : 0;
  const safeSalary = isValidNumber(salary) ? salary : 0;
  const safeSeconds = isValidNumber(seconds) ? seconds : 0;
  const mins = Math.round(safeSeconds / 60);
  const burnMin = (safeSalary * safePeople) / MINS_A_YEAR;
  const burnTotal = (burnMin * safeSeconds) / 60;
  const currencyChars = maxFormattedLength(formatCurrency, burnTotal, burnMin);
  // BURNS line uses 3rem type on a 2rem page; reserve width without exceeding the viewport.
  const pageMinWidth = `min(calc(${6 + Math.ceil(currencyChars * 1.6)}ch), calc(100vw - 2rem))`;
  const [contentOpen, setContentOpen] = useState(false);
  const [showZoomToast, setShowZoomToast] = useState(false);
  const prevZoomModeRef = useRef(zoomMode);

  useEffect(() => {
    if (isLoaded) {
      setContentOpen(true);
    }
  }, [isLoaded]);

  useEffect(() => {
    if (zoomMode) {
      document.body.dataset.zoomMode = "true";
    } else {
      delete document.body.dataset.zoomMode;
    }

    return () => {
      delete document.body.dataset.zoomMode;
    };
  }, [zoomMode]);

  useEffect(() => {
    if (zoomMode && !prevZoomModeRef.current) {
      setShowZoomToast(true);
      const timer = globalThis.setTimeout(() => {
        setShowZoomToast(false);
      }, 4000);
      prevZoomModeRef.current = zoomMode;
      return () => {
        globalThis.clearTimeout(timer);
      };
    }

    if (!zoomMode) {
      setShowZoomToast(false);
    }

    prevZoomModeRef.current = zoomMode;
  }, [zoomMode]);

  useEffect(() => {
    if (!zoomMode) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setZoomMode(false);
      }
    };

    globalThis.addEventListener("keydown", onKeyDown);
    return () => {
      globalThis.removeEventListener("keydown", onKeyDown);
    };
  }, [setZoomMode, zoomMode]);

  const setMins = (newMins: number) => {
    setSeconds(newMins * 60);
  };

  let body = <></>;
  if (mode === MODES.STATIC) {
    body = (
      <Static
        mins={mins}
        setMins={setMins}
        burnTotal={burnTotal}
        burnMin={burnMin}
        setMode={setMode}
        contentOpen={contentOpen}
      />
    );
  } else if (mode === MODES.TIMER) {
    body = (
      <Timer
        burnMin={burnMin}
        seconds={seconds}
        setSeconds={setSeconds}
        setMode={setMode}
        contentOpen={contentOpen}
      />
    );
  }

  return (
    <>
      <PageContent $minWidth={pageMinWidth} $zoomMode={zoomMode}>
        <ResetButton resetState={resetState} />
        <Trail open={isLoaded} onStarted={() => setContentOpen(true)}>
          <TextRow>
            <DiscreetInput
              name="people"
              min={0}
              max={100000}
              value={String(safePeople)}
              setValue={setPeople}
            />{" "}
            PEOPLE
          </TextRow>
          <TextRow>
            AT
            <DiscreetInput
              name="salary"
              min={0}
              max={10000000}
              stepSize={1000}
              format
              value={String(safeSalary)}
              setValue={setSalary}
              prefix="$"
            />
            A YEAR
          </TextRow>
        </Trail>
        {body}
        {!zoomMode ? (
          <Tooltip
            content={
              <>
                Download{" "}
                <a href={OBS_URL} rel="noopener noreferrer" target="_blank">
                  OBS
                </a>{" "}
                and use Virtual Camera for a live background.
              </>
            }
          >
            <TextButton
              type="button"
              fontSize={sizes.buttonFontSize}
              onClick={() => {
                setZoomMode(true);
              }}
            >
              ZOOM MODE: OFF
            </TextButton>
          </Tooltip>
        ) : null}
      </PageContent>
      <ZoomModeToast visible={showZoomToast} />
    </>
  );
};

MainTemplate.propTypes = {
  mode: string,
  people: number.isRequired,
  salary: number.isRequired,
  seconds: number.isRequired,
  setMode: func.isRequired,
  setPeople: func.isRequired,
  setSalary: func.isRequired,
  setSeconds: func.isRequired,
  resetState: func.isRequired,
  isLoaded: bool.isRequired,
  zoomMode: bool.isRequired,
  setZoomMode: func.isRequired,
};

export default MainTemplate;
