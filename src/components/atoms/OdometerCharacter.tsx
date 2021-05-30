import { number, oneOfType, string } from "prop-types";
import { useSpring, animated as a } from "react-spring";
import styled from "@emotion/styled";

const Digit = styled.div`
  display: inline-block;
  overflow: hidden;
  width: ${({ narrow = false }: { narrow: boolean }) =>
    narrow ? "0.4em" : "0.52em"};
  height: 1em;
`;

const Char = styled.div`
  display: inline-block;
`;

const OdometerCharacter = ({
  char,
}: {
  char: string | number;
}): React.ReactElement => {
  const num = Number(char) || 0;

  const style = useSpring({
    from: { opacity: 0, transform: "translateY(0em)" },
    to: { opacity: 1, transform: `translateY(${-num}em)` },
  });
  if (Number.isNaN(Number(char))) {
    return <Char>{char}</Char>;
  }
  return (
    <Digit narrow={num === 1}>
      <a.div style={style}>0 1 2 3 4 5 6 7 8 9 0</a.div>
    </Digit>
  );
};

OdometerCharacter.propTypes = {
  char: oneOfType([number, string]).isRequired,
};

export default OdometerCharacter;
