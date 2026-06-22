import { colors, sizes } from "@constants";
import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        margin: 0;
        padding: 0;
        background: ${colors.background};
        color: ${colors.primary};
        min-height: 100%;
        height: 100%;
        font-family: Oswald, Helvetica, Arial, sans-serif;
        text-transform: uppercase;
        font-weight: 400;
        font-size: ${sizes.fontSize};
        line-height: ${sizes.fontSize};
        vertical-align: middle;
        @media (max-width: ${sizes.small.mediaQuery}) {
          font-size: ${sizes.small.fontSize};
          line-height: ${sizes.small.lineHeight};
        }
      }
      body {
        align-items: center;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        min-height: 100%;
        padding: 1rem;
        @media (max-width: ${sizes.small.mediaQuery}) {
          padding: 1rem 0.75rem;
        }
      }
      #__next {
        max-width: 100%;
      }
    `}
  />
);

export const InputText = styled.span`
  font-weight: 600;
  color: ${colors.highlighted};
`;
export const HighlightedText = styled.span`
  font-weight: 600;
  color: ${colors.highlighted};
  ${({ fontSize }: { fontSize?: string }) =>
    fontSize ? `font-size: ${fontSize};line-height:${fontSize};` : null}
`;
