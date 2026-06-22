import { DiscreetInput, TextRow } from "@atoms";
import { MINS_A_YEAR, MODES, usdFormatter } from "@constants";
import styled from "@emotion/styled";
import { ResetButton, Trail } from "@molecules";
import { Static, Timer } from "@organisms";
import { maxFormattedLength } from "@shared/odometer";
import { isValidNumber } from "@shared/params";
import { bool, func, number, string } from "prop-types";
import { type ReactElement, useEffect, useState } from "react";

const formatCurrency = (value: number): string => usdFormatter.format(value);

const PageContent = styled.div<{ $minWidth: string }>`
  max-width: 100%;
  min-width: ${({ $minWidth }) => $minWidth};
  width: max-content;
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
}: MainProps): ReactElement => {
  const safePeople = isValidNumber(people) ? people : 0;
  const safeSalary = isValidNumber(salary) ? salary : 0;
  const safeSeconds = isValidNumber(seconds) ? seconds : 0;
  const mins = Math.round(safeSeconds / 60);
  const burnMin = (safeSalary * safePeople) / MINS_A_YEAR;
  const burnTotal = (burnMin * safeSeconds) / 60;
  const currencyChars = maxFormattedLength(
    formatCurrency,
    burnTotal,
    burnMin,
  );
  // BURNS line uses 3rem type on a 2rem page; reserve width without exceeding the viewport.
  const pageMinWidth = `min(calc(${6 + Math.ceil(currencyChars * 1.6)}ch), calc(100vw - 2rem))`;
  const [contentOpen, setContentOpen] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      setContentOpen(true);
    }
  }, [isLoaded]);

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
    <PageContent $minWidth={pageMinWidth}>
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
    </PageContent>
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
};

export default MainTemplate;
