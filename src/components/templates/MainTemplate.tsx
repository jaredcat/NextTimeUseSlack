import { ReactElement, useState } from "react";
import { number, func, string, bool } from "prop-types";
import { Static, Timer } from "@organisms";
import { MINS_A_YEAR, MODES, usdFormatter } from "@constants";
import { DiscreetInput, TextRow } from "@atoms";
import { ResetButton, Trail } from "@molecules";

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
  mode,
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
  const mins = Math.round(seconds / 60);
  const burnMin = (salary * people) / MINS_A_YEAR;
  const burnTotal = (burnMin * seconds) / 60;
  const burnMinPretty = usdFormatter.format(burnMin);
  const burnTotalPretty = usdFormatter.format(burnTotal);
  const [animationStared, setAnimationStared] = useState<boolean>(false);

  const setMins = (newMins: number) => {
    setSeconds(newMins * 60);
  };

  let body = <></>;
  if (mode === MODES.STATIC) {
    body = (
      <Static
        mins={mins}
        setMins={setMins}
        burnTotalPretty={burnTotalPretty}
        burnMinPretty={burnMinPretty}
        setMode={setMode}
        parentAnimationStarted={animationStared}
      />
    );
  } else if (mode === MODES.TIMER) {
    body = (
      <Timer
        burnMin={burnMin}
        seconds={seconds}
        setSeconds={setSeconds}
        setMode={setMode}
        parentAnimationStarted={animationStared}
      />
    );
  }

  return (
    <>
      <ResetButton resetState={resetState} />
      <Trail open={isLoaded} setStarted={setAnimationStared}>
        <TextRow>
          <DiscreetInput
            name="people"
            min={0}
            max={100000}
            value={people.toString()}
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
            value={salary.toString()}
            setValue={setSalary}
            prefix="$"
          />
          A YEAR
        </TextRow>
      </Trail>
      {body}
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
};

MainTemplate.defaultProps = {
  mode: MODES.STATIC,
};

export default MainTemplate;
