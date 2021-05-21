import { string, number, func, bool } from "prop-types";
import styled from "@emotion/styled";
import { sizes } from "@constants";

const Input = styled.input`
  width: ${({ width }) => width}ch;
  background: none;
  border: none;
  color: white;
  font-family: Oswald, Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: 2rem;
  text-align: center;
  vertical-align: top;
  box-sizing: border-box;
  line-height: ${sizes.lineHeight};
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
  let intStr = str.replace(/[^0-9]/g, "");
  if (!intStr) intStr = `${min}`;
  return parseInt(intStr, 10);
};

const DiscreetInput = ({
  name,
  value,
  min,
  max,
  setValue,
  format,
  stepSize,
  prefix,
  postfix,
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
    let newValue = value;
    if (e.key === "ArrowUp") {
      newValue = (stringToInt(value) + stepSize).toString();
    } else if (e.key === "ArrowDown") {
      newValue = (stringToInt(value) - stepSize).toString();
    } else if (e.key === "Backspace") {
      newValue = value.slice(0, -1);
    } else if (e.key === "Delete") {
      newValue = value.slice(1);
    }
    let fakeEvent: React.ChangeEvent<HTMLInputElement>;
    // eslint-disable-next-line prefer-const
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
  displayValue = `${prefix}${displayValue}${postfix}`;

  return (
    <Input
      type="string"
      name={name}
      value={displayValue}
      width={Math.max(displayValue.length, 1)}
      onChange={changeValue}
      onKeyDown={onKeyDown}
    />
  );
};

DiscreetInput.propTypes = {
  name: string.isRequired,
  value: string.isRequired,
  setValue: func.isRequired,
  min: number,
  max: number,
  format: bool,
  stepSize: number,
  prefix: string,
  postfix: string,
};
DiscreetInput.defaultProps = {
  min: null,
  max: null,
  format: false,
  stepSize: 1,
  prefix: "",
  postfix: "",
};

export default DiscreetInput;
