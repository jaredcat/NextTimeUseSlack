import { DiscreetInput, TextButton, TextRow } from "@atoms";
import { MODES, sizes } from "@constants";
import styled from "@emotion/styled";
import { Odometer, Trail } from "@molecules";
import { isValidNumber } from "@shared/params";
import { HighlightedText } from "@shared/styles";
import { bool, func, number, string } from "prop-types";
import type { ReactElement } from "react";

interface StaticProps {
  mins: number;
  setMins(mins: number): void;
  burnTotalPretty: string;
  burnMinPretty: string;
  setMode(mode: string): void;
  contentOpen: boolean;
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
  contentOpen,
}: StaticProps): ReactElement => (
  <Trail open={contentOpen}>
      <TextRow>
        FOR A{" "}
        <DiscreetInput
          name="mins"
          min={0}
          max={1000}
          stepSize={5}
          value={String(isValidNumber(mins) ? mins : 0)}
          setValue={setMins}
        />
        <HighlightedText> MIN</HighlightedText> MEETING
      </TextRow>
      <TextRow>
        <LargeText>
          BURNS{" "}
          <HighlightedText>
            <Odometer text={burnTotalPretty} />
          </HighlightedText>
        </LargeText>
      </TextRow>
      <TextRow>
        AT{" "}
        <HighlightedText>
          <Odometer text={burnMinPretty} />
        </HighlightedText>{" "}
        A MIN
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
Static.propTypes = {
  mins: number.isRequired,
  setMins: func.isRequired,
  burnTotalPretty: string.isRequired,
  burnMinPretty: string.isRequired,
  setMode: func.isRequired,
  contentOpen: bool.isRequired,
};

export default Static;
