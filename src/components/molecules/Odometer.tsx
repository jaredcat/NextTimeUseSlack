import { OdometerCharacter } from "@atoms";
import { number, oneOfType, string } from "prop-types";

const OdometerText = ({
  text,
}: {
  text: string | number;
}): React.ReactElement => {
  const chars = String(text).split("");
  const odometerText = chars.map((char, i) => (
    // biome-ignore lint/suspicious/noArrayIndexKey: stable digit order for odometer animation
    <OdometerCharacter char={char} key={chars.length - i} />
  ));
  return <>{odometerText}</>;
};

OdometerText.propTypes = {
  text: oneOfType([string, number]).isRequired,
};

export default OdometerText;
