import { ReactElement } from "react";
import { number, func, string } from "prop-types";
import { DiscreetInput, TextButton } from "@atoms";
import { HighlightedText } from "@shared/styles";
import { MODES, sizes } from "@constants";
import styled from "@emotion/styled";

interface StaticProps {
  mins: number;
  setMins(mins: number): void;
  burnTotalPretty: string;
  burnMinPretty: string;
  setMode(mode: string): void;
}

const LargeText = styled.span`
  font-size: 3rem;
  line-height: 3rem;
`;

const Static = ({
  mins,
  setMins,
  burnTotalPretty,
  burnMinPretty,
  setMode,
}: StaticProps): ReactElement => (
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
    <LargeText>
      BURNS <HighlightedText>{burnTotalPretty}</HighlightedText>
    </LargeText>
    <br />
    AT <HighlightedText>{burnMinPretty}</HighlightedText> A MIN
    <br />
    <br />
    <TextButton
      type="button"
      fontSize={sizes.buttonFontSize}
      onClick={() => {
        setMode(MODES.TIMER);
      }}
    >
      START MEETING TIMER
    </TextButton>
  </>
);

Static.propTypes = {
  mins: number.isRequired,
  setMins: func.isRequired,
  burnTotalPretty: string.isRequired,
  burnMinPretty: string.isRequired,
  setMode: func.isRequired,
};

export default Static;
