import { css, Global, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import {sizes} from '@constants';

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        margin: 0;
        padding: 0;
        background: #374795;
        color: #a5b4ff;
        min-height: 100%;
        height: 100%;
        font-family: Oswald, Helvetica, Arial, sans-serif;
        font-weight: 400;
        font-size: 2em;
        line-height: ${sizes.lineHeight};
        vertical-align:middle;
      }
      body {
        display: grid;
        justify-content: center;
        align-content: center;
      }
    `}
  />
);

export const InputText = styled.span`
  font-weight: 600;
  color: white;
`;
export const HighlightedText = styled.span`
  font-weight: 600;
  color: white;
`;

export const basicStyles = css`
  background-color: white;
  color: cornflowerblue;
  border: 1px solid lightgreen;
  border-right: none;
  border-bottom: none;
  box-shadow: 5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow;
  transition: all 0.1s linear;
  margin: 3rem 0;
  padding: 1rem 0.5rem;
`;

export const hoverStyles = css`
  &:hover {
    color: white;
    background-color: lightgray;
    border-color: aqua;
    box-shadow: -15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue;
  }
`;
export const bounce = keyframes`
  from {
    transform: scale(1.01);
  }
  to {
    transform: scale(0.99);
  }
`;

export const Basic = styled.div`
  ${basicStyles};
`;

export const Combined = styled.div`
  ${basicStyles};
  ${hoverStyles};
  & code {
    background-color: linen;
  }
`;
export const Animated = styled("div")<{ animation: string }>`
  ${basicStyles};
  ${hoverStyles};
  & code {
    background-color: linen;
  }
  animation: ${(props) => props.animation} 0.2s infinite ease-in-out alternate;
`;
