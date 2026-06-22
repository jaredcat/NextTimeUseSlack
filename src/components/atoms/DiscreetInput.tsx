import { colors, sizes } from "@constants";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { bool, func, number, string } from "prop-types";

interface DynamicStyleProps {
  width: number;
  fontSize?: string;
}

const dynamicStyle = ({ width, fontSize }: DynamicStyleProps) =>
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
  height: ${Number(new RegExp(/\d+/).exec(sizes.fontSize)?.[0] ?? 0) * 33}px;
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
    height: ${Number(sizes.small.fontSize.match(/[\d+.]/g)?.join("") ?? 0) * 23.334}px;
  }
`;

const stringToInt = (str: string, min = 0): number => {
  const intStr = str.replace(/[^0-9-]/g, "");
  if (!intStr || intStr === "-") return min;

  const parsed = Number.parseInt(intStr, 10);
  return Number.isFinite(parsed) ? parsed : min;
};

const clamp = (
  value: number,
  min: number | null,
  max: number | null,
): number => {
  let result = value;
  if (min != null) result = Math.max(min, result);
  if (max != null) result = Math.min(max, result);
  return result;
};

interface DiscreetInputProps {
  fontSize?: string;
  format?: boolean;
  max?: number | null;
  min?: number | null;
  name: string;
  postfix?: string;
  prefix?: string;
  setValue(intValue: number): void;
  stepSize?: number;
  value: string;
}

const DiscreetInput = ({
  fontSize = "1em",
  format = false,
  max = null,
  min = null,
  name,
  postfix = "",
  prefix = "",
  setValue,
  stepSize = 1,
  value,
}: DiscreetInputProps): React.ReactElement => {
  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const intValue = clamp(stringToInt(newValue, min ?? 0), min, max);
    setValue(intValue);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let newValue = value;
    if (e.key === "ArrowUp") {
      newValue = (stringToInt(value) + stepSize).toString();
    } else if (e.key === "ArrowDown") {
      newValue = (stringToInt(value) - stepSize).toString();
    }
    const fakeEvent = {
      target: { value: newValue },
    } as React.ChangeEvent<HTMLInputElement>;
    changeValue(fakeEvent);
  };

  const safeValue = value ?? "";
  let displayValue = safeValue;
  if (format) {
    displayValue = stringToInt(safeValue, min ?? 0).toLocaleString("en");
  }
  displayValue = `${prefix ?? ""}${displayValue}${postfix ?? ""}`;

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

export default DiscreetInput;
