import styled from "@emotion/styled";
import { memo, useEffect, useRef, useState } from "react";
import { animated as a, useSpring } from "react-spring";

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

const OdometerCharacter = memo(
  ({ char }: { char: string | number }): React.ReactElement => {
    const isDigit = !Number.isNaN(Number(char));
    const num = isDigit ? Number(char) : 0;
    const prevNum = useRef<number | null>(null);
    const [strip, setStrip] = useState(() => (isDigit ? String(num) : ""));

    const [style, api] = useSpring(
      () => ({
        transform: "translateY(0em)",
      }),
      [],
    );

    useEffect(() => {
      if (!isDigit) {
        return;
      }

      if (prevNum.current === null) {
        prevNum.current = num;
        setStrip(String(num));
        return;
      }

      if (prevNum.current === num) {
        return;
      }

      const numberArray = getNumbersArray(prevNum.current, num);
      setStrip(numberArray.join(" "));
      api.start({
        from: { transform: "translateY(0em)" },
        to: { transform: `translateY(${-(numberArray.length - 1)}em)` },
        reset: true,
      });
      prevNum.current = num;
    }, [num, isDigit, api]);

    if (!isDigit) {
      return <Char>{char}</Char>;
    }

    return (
      <Digit narrow={num === 1}>
        <a.div style={style}>{strip}</a.div>
      </Digit>
    );
  },
);

OdometerCharacter.displayName = "OdometerCharacter";

export default OdometerCharacter;
