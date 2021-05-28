import { ReactElement } from "react";
import { number, func, string, bool } from "prop-types";
import { DiscreetInput, TextButton, TextRow } from "@atoms";
import { HighlightedText } from "@shared/styles";
import { Trail } from "@molecules";
import { MODES, sizes } from "@constants";
import useStartChildAnimation from "@hooks";
import styled from "@emotion/styled";

interface StaticProps {
  mins: number;
  setMins(mins: number): void;
  burnTotalPretty: string;
  burnMinPretty: string;
  setMode(mode: string): void;
  parentAnimationStarted: boolean;
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
  parentAnimationStarted,
}: StaticProps): ReactElement => {
  const open = useStartChildAnimation({ parentAnimationStarted, delay: 130 });

  return (
    <Trail open={open}>
      <TextRow>
        FOR A
        <DiscreetInput
          name="mins"
          min={0}
          max={1000}
          stepSize={5}
          value={mins.toString()}
          setValue={setMins}
          postfix=" MIN"
        />
        MEETING
      </TextRow>
      <TextRow>
        <LargeText>
          BURNS <HighlightedText>{burnTotalPretty}</HighlightedText>
        </LargeText>
      </TextRow>
      <TextRow>
        AT <HighlightedText>{burnMinPretty}</HighlightedText> A MIN
      </TextRow>
      <TextButton
        type="button"
        fontSize={sizes.buttonFontSize}
        onClick={() => {
          setMode(MODES.TIMER);
        }}
      >
        START MEETING TIMER
      </TextButton>
    </Trail>
  );
};
Static.propTypes = {
  mins: number.isRequired,
  setMins: func.isRequired,
  burnTotalPretty: string.isRequired,
  burnMinPretty: string.isRequired,
  setMode: func.isRequired,
  parentAnimationStarted: bool.isRequired,
};

export default Static;
