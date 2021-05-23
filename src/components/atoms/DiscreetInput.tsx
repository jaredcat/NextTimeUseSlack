import { string, number, func, bool } from "prop-types";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { sizes, colors } from "@constants";

const dynamicStyle = ({ width, fontSize }) =>
  css`
    font-size: ${fontSize};
    width: ${width}ch;
  `;

const Input = styled.input`
  ${dynamicStyle}
  background: none;
  border: none;
  color: ${colors.highlighted};
  font-family: Oswald, Helvetica, Arial, sans-serif;
  font-weight: 600;
  font-size: ${sizes.fontSize};
  text-align: center;
  box-sizing: border-box;
  height: ${Number(sizes.fontSize.match(/\d+/)[0]) * 33}px;
  &:focus {
    outline: none;
  }
  -moz-appearance: textfield;
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media (max-width: ${sizes.small.mediaQuery}) {
    font-size: ${sizes.small.fontSize};
    height: ${Number(sizes.small.fontSize.match(/[\d+.]/g).join("")) *
    23.334}px;
  }
`;

const stringToInt = (str: string, min = 0): number => {
  const intStr = str.replace(/[^0-9-]/g, "");
  if (!intStr) return min;
  return parseInt(intStr, 10);
};

interface DiscreetInputProps {
  fontSize?: string;
  format?: boolean;
  max?: number;
  min?: number;
  name: string;
  postfix?: string;
  prefix?: string;
  setValue(intValue: number): void;
  stepSize?: number;
  value: string;
}

const DiscreetInput = ({
  fontSize,
  format,
  max,
  min,
  name,
  postfix,
  prefix,
  setValue,
  stepSize,
  value,
}: DiscreetInputProps): React.ReactElement => {
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
      fontSize={fontSize}
    />
  );
};

DiscreetInput.propTypes = {
  fontSize: string,
  format: bool,
  max: number,
  min: number,
  name: string.isRequired,
  postfix: string,
  prefix: string,
  setValue: func.isRequired,
  stepSize: number,
  value: string.isRequired,
};
DiscreetInput.defaultProps = {
  fontSize: "1em",
  format: false,
  max: null,
  min: null,
  postfix: "",
  prefix: "",
  stepSize: 1,
};

export default DiscreetInput;
