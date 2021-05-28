import { ReactElement } from "react";
import { number, func, string } from "prop-types";
import { Static, Timer } from "@organisms";
import { MINS_A_YEAR, MODES, usdFormatter } from "@constants";
import { DiscreetInput } from "@atoms";
import ResetButton from "@molecules";

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
}: MainProps): ReactElement => {
  const mins = Math.round(seconds / 60);
  const burnMin = (salary * people) / MINS_A_YEAR;
  const burnTotal = (burnMin * seconds) / 60;
  const burnMinPretty = usdFormatter.format(burnMin);
  const burnTotalPretty = usdFormatter.format(burnTotal);

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
      />
    );
  } else if (mode === MODES.TIMER) {
    body = (
      <Timer
        burnMin={burnMin}
        seconds={seconds}
        setSeconds={setSeconds}
        setMode={setMode}
      />
    );
  }

  return (
    <div>
      <ResetButton resetState={resetState} />
      <DiscreetInput
        name="people"
        min={1}
        max={100000}
        value={people.toString()}
        setValue={setPeople}
      />{" "}
      PEOPLE
      <br />
      AT
      <DiscreetInput
        name="salary"
        min={1}
        max={10000000}
        stepSize={1000}
        format
        value={salary.toString()}
        setValue={setSalary}
        prefix="$"
      />
      A YEAR
      <br />
      {body}
    </div>
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
};

MainTemplate.defaultProps = {
  mode: MODES.STATIC,
};

export default MainTemplate;
