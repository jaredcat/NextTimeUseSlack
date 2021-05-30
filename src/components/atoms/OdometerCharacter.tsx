import { useRef, ReactElement } from "react";
import { number, oneOfType, string } from "prop-types";
import { useSpring, animated as a } from "react-spring";
import styled from "@emotion/styled";

const Digit = styled.div`
  display: inline-block;
  overflow: hidden;
  width: ${({ narrow = false }: { narrow?: boolean }) =>
    narrow ? "0.4em" : "0.52em"};
  height: 1em;
`;

const Char = styled.div`
  display: inline-block;
`;

// Creates a string of numbers from the start to end consecutively, looping past 0
const getNumbersArray = (start: number, end: number): Array<number> => {
  const numbers: Array<number> = [];
  let init = start;
  if (start === 9 && end === 0) {
    return [9, 0];
  }
  if (end < start) {
    init = 0;
    for (let i = end; i < 10; i += 1) {
      numbers.push(i);
    }
  }
  for (let i = init; i <= end; i += 1) {
    numbers.push(i);
  }

  return numbers;
};

const OdometerCharacter = ({
  char,
}: {
  char: string | number;
}): ReactElement => {
  const num = Number(char) || 0;
  const prevNum = useRef(0);
  const numberArray = getNumbersArray(prevNum.current, num);

  const style = useSpring({
    from: { transform: `translateY(0em)` },
    to: { transform: `translateY(${-(numberArray.length - 1)}em)` },
    reset: true,
  });

  if (Number.isNaN(Number(char))) {
    return <Char>{char}</Char>;
  }

  prevNum.current = num;

  return (
    <Digit narrow={num === 1}>
      <a.div style={style}>{numberArray.join(" ")}</a.div>
    </Digit>
  );
};

OdometerCharacter.propTypes = {
  char: oneOfType([number, string]).isRequired,
};

export default OdometerCharacter;
