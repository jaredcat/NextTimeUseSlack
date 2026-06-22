import { DiscreetInput, TextButton, TextRow } from "@atoms";
import { MODES, sizes, usdFormatter } from "@constants";
import styled from "@emotion/styled";
import { Odometer, Trail } from "@molecules";
import { isValidNumber } from "@shared/params";
import { HighlightedText } from "@shared/styles";
import { bool, func, number } from "prop-types";
import type { ReactElement } from "react";

interface StaticProps {
  mins: number;
  setMins(mins: number): void;
  burnTotal: number;
  burnMin: number;
  setMode(mode: string): void;
  contentOpen: boolean;
}

const LargeText = styled.span`
  font-size: 3rem;
  line-height: 3rem;
`;

const formatCurrency = (value: number): string => usdFormatter.format(value);

const Static = ({
  mins,
  setMins,
  burnTotal,
  burnMin,
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
          <Odometer format={formatCurrency} value={burnTotal} />
        </HighlightedText>
      </LargeText>
    </TextRow>
    <TextRow>
      AT{" "}
      <HighlightedText>
        <Odometer format={formatCurrency} value={burnMin} />
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
  burnTotal: number.isRequired,
  burnMin: number.isRequired,
  setMode: func.isRequired,
  contentOpen: bool.isRequired,
};

export default Static;
