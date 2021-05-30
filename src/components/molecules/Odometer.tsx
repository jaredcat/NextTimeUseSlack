/* eslint-disable react/no-array-index-key */
import { number, string, oneOfType } from "prop-types";
import { OdometerCharacter } from "@atoms";

const OdometerText = ({
  text,
}: {
  text: string | number;
}): React.ReactElement => {
  const chars = String(text).split("");
  const odometerText = chars.map((char, i) => (
    <OdometerCharacter char={char} key={chars.length - i} />
  ));
  return <>{odometerText}</>;
};

OdometerText.propTypes = {
  text: oneOfType([string, number]).isRequired,
};

export default OdometerText;
