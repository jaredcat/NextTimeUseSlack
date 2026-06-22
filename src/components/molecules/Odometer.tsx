import { OdometerCharacter } from "@atoms";
import { number, oneOfType, string } from "prop-types";

const OdometerText = ({
  text,
}: {
  text: string | number;
}): React.ReactElement => {
  const chars = String(text).split("");
  const odometerText = chars.map((char, i) => (
    <OdometerCharacter char={char} key={`pos-${i}`} />
  ));
  return <>{odometerText}</>;
};

OdometerText.propTypes = {
  text: oneOfType([string, number]).isRequired,
};

export default OdometerText;
