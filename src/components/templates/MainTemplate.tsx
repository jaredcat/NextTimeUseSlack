import { number, func } from "prop-types";
import DiscreetInput from "@atoms";
import { Static } from "@organisms";
import { MINS_A_YEAR } from "@constants";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const MainTemplate = ({ people, setPeople, salary, setSalary, seconds, setSeconds}) => {
  const mins = Math.round(seconds/60);
  const burnMin = (salary * people) / MINS_A_YEAR;
  const burnTotal = burnMin * seconds / 60;
  const burnMinPretty = usdFormatter.format(burnMin);
  const burnTotalPretty = usdFormatter.format(burnTotal);

  const setMins = (newMins) => {
    setSeconds(newMins*60);
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
      <Static mins={mins} setMins={setMins} burnTotalPretty={burnTotalPretty} burnMinPretty={burnMinPretty}/>
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
