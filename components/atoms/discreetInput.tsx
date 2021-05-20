import { string, number, any, func, bool } from "prop-types";
import styled from "@emotion/styled";

const Input = styled.input`
  width: ${({ width }) => width}em;
  background: none;
  border: none;
  color: white;
  font-family: Oswald, Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 24px;
  text-align: center;
  &:focus {
    outline: none;
  }
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const stringToInt = (str: string, min: number = 0): number => {
  if (!str) str = `${min}`;
  return parseInt(str.replaceAll(",", ""), 10);
};

const DiscreetInput = ({
  name,
  value,
  min,
  max,
  setValue,
  format,
  stepSize,
}) => {
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e?.target?.value;
    let intValue = stringToInt(newValue, min);
    if (max || min) {
      if (intValue > max) intValue = max;
      if (intValue < min) intValue = min;
    }
    setValue(intValue);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let fakeTarget: HTMLInputElement;
    let fakeEvent: React.ChangeEvent<HTMLInputElement>;
    let newValue = value;
    if (e.key === "ArrowUp") {
      newValue = (stringToInt(value) + stepSize).toString();
    } else if (e.key === "ArrowDown") {
      newValue = (stringToInt(value) - stepSize).toString();
    }
    fakeEvent = {
      ...fakeEvent,
      target: {
        ...fakeTarget,
        value: newValue,
      },
    };
    changeValue(fakeEvent);
  };

  let displayValue = value;
  if (format) {
    displayValue = stringToInt(value).toLocaleString("en");
  }

  return (
    <Input
      type="string"
      name={name}
      value={displayValue}
      width={Math.max(value.toString().length - 1, 1)}
      onChange={changeValue}
      onKeyDown={onKeyDown}
    />
  );
};

(DiscreetInput.propTypes = {
  name: string.isRequired,
  value: string.isRequired,
  setValue: func.isRequired,
  min: number,
  max: number,
  format: bool,
  stepSize: number,
}),
  (DiscreetInput.defaultProps = {
    min: null,
    max: null,
    format: false,
    stepSize: 1,
  });

export default DiscreetInput;
