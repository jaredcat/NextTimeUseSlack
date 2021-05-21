import { number, func, string } from "prop-types";
import DiscreetInput from "@atoms";
import { HighlightedText } from "@shared/styles";

const Static = ({ mins, setMins, burnTotalPretty, burnMinPretty }) => (
  <>
    FOR A
    <DiscreetInput
      name="mins"
      min={0}
      max={999}
      stepSize={5}
      value={mins.toString()}
      setValue={setMins}
      postfix=" MIN"
    />
    MEETING
    <br />
    BURNS <HighlightedText>{burnTotalPretty}</HighlightedText>
    <br />
    AT <HighlightedText>{burnMinPretty}</HighlightedText> A MIN
  </>
);

Static.propTypes = {
  mins: number.isRequired,
  setMins: func.isRequired,
  burnTotalPretty: string.isRequired,
  burnMinPretty: string.isRequired,
};

export default Static;
