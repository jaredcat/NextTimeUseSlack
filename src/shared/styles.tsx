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
        overflow-x: hidden;
        padding: 1rem;
        @media (max-width: ${sizes.small.mediaQuery}) {
          align-items: flex-start;
          padding: 3.5rem 0.75rem 1rem;
        }
      }
      #__next {
        max-width: 100%;
      }
      body[data-zoom-mode="true"] {
        align-items: center;
        justify-content: flex-start;
        padding: 1rem min(42vw, 32rem) 1rem 2.5rem;
      }
      body[data-zoom-mode="true"] button,
      body[data-zoom-mode="true"] [data-zoom-control] {
        display: none;
      }
      body[data-zoom-mode="true"] #__next {
        display: flex;
        justify-content: flex-start;
        width: 100%;
      }
      @media (max-width: ${sizes.small.mediaQuery}) {
        body[data-zoom-mode="true"] {
          align-items: flex-start;
          justify-content: flex-start;
          padding: 3.5rem 0.75rem 1rem 0.75rem;
        }
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

export const LargeText = styled.span`
  font-size: ${sizes.largeFontSize};
  line-height: ${sizes.largeFontSize};

  @media (max-width: ${sizes.small.mediaQuery}) {
    font-size: ${sizes.small.largeFontSize};
    line-height: ${sizes.small.largeFontSize};
  }
`;

export const HeroText = styled(HighlightedText)`
  font-size: ${sizes.heroFontSize};
  line-height: ${sizes.heroFontSize};

  @media (max-width: ${sizes.small.mediaQuery}) {
    font-size: ${sizes.small.heroFontSize};
    line-height: ${sizes.small.heroFontSize};
  }
`;
