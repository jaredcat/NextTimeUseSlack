import { ReactElement, useState } from "react";
import { number, func } from "prop-types";
import {DiscreetInput} from "@atoms";
import { Static, Timer } from "@organisms";
import { MINS_A_YEAR, MODES, usdFormatter } from "@constants";

interface MainProps {
  people: number;
  setPeople(people: number): void;
  salary: number;
  setSalary(salary: number): void;
  seconds: number;
  setSeconds(seconds: number): void;
}

const MainTemplate = ({
  people,
  setPeople,
  salary,
  setSalary,
  seconds,
  setSeconds,
}: MainProps): ReactElement => {
  const [mode, setMode] = useState(MODES.STATIC);
  const mins = Math.round(seconds / 60);
  const burnMin = (salary * people) / MINS_A_YEAR;
  const burnTotal = (burnMin * seconds) / 60;
  const burnMinPretty = usdFormatter.format(burnMin);
  const burnTotalPretty = usdFormatter.format(burnTotal);

  const setMins = (newMins) => {
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
    body = <Timer burnMin={burnMin} seconds={seconds} setSeconds={setSeconds} />;
  }

  return (
    <div>
      <DiscreetInput
        name="people"
        min={0}
        max={99999}
        value={people.toString()}
        setValue={setPeople}
      />{" "}
      PEOPLE
      <br />
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
      <br />
      {body}
    </div>
  );
};

MainTemplate.propTypes = {
  seconds: number.isRequired,
  people: number.isRequired,
  salary: number.isRequired,
  setSeconds: func.isRequired,
  setPeople: func.isRequired,
  setSalary: func.isRequired,
};

export default MainTemplate;
