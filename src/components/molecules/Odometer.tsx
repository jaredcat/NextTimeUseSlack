/* eslint-disable react/no-array-index-key */
// import numbro from "numbro";
import { number, string, oneOfType } from "prop-types";
import { OdometerCharacter } from "@atoms";

const OdometerText = ({
  text,
}: {
  text: string | number;
}): React.ReactElement => {
  const chars = String(text).split("");
  const odometerText = chars.map((char, i) => (
    <OdometerCharacter char={char} key={i} />
  ));
  return <>{odometerText}</>;
};

OdometerText.propTypes = {
  text: oneOfType([string, number]).isRequired,
};

export default OdometerText;
