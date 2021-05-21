import { number, func } from "prop-types";
import DiscreetInput from "@atoms";
import { HighlightedText } from "@shared/styles";
import { MINS_A_YEAR } from "@constants";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const Main = ({ people, setPeople, salary, setSalary, mins, setMins }) => {
  const burnMin = (salary * people) / MINS_A_YEAR;
  const burnTotal = burnMin * mins;
  const burnMinPretty = usdFormatter.format(burnMin);
  const burnTotalPretty = usdFormatter.format(burnTotal);

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
      AT{" "}
      <DiscreetInput
        name="salary"
        min={0}
        max={10000000}
        stepSize={1000}
        format
        value={salary.toString()}
        setValue={setSalary}
        prefix="$"
      />{" "}
      A YEAR
      <br />
      FOR
      <DiscreetInput
        name="mins"
        min={0}
        max={999}
        value={mins.toString()}
        setValue={setMins}
        postfix=" MINS"
      />{" "}
      MEETING
      <br />
      BURNS <HighlightedText>{burnTotalPretty}</HighlightedText>
      <br />
      AT <HighlightedText>{burnMinPretty}</HighlightedText> A MIN
    </div>
  );
};

Main.propTypes = {
  mins: number.isRequired,
  people: number.isRequired,
  salary: number.isRequired,
  setMins: func.isRequired,
  setPeople: func.isRequired,
  setSalary: func.isRequired,
};

export default Main;
