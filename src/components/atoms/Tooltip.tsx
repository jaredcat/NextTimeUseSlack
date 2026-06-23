import { colors, sizes } from "@constants";
import styled from "@emotion/styled";
import { node } from "prop-types";
import {
  type ReactElement,
  type ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

const SHOW_DELAY_MS = 500;
const HIDE_DELAY_MS = 120;

const Wrapper = styled.span`
  display: inline-block;
  position: relative;
`;

const Content = styled.span<{ $visible: boolean }>`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 3px;
  color: ${colors.highlighted};
  font-size: 0.75rem;
  left: 0;
  line-height: 1.25;
  max-width: 10.5rem;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  padding: 0.3rem 0.45rem;
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  position: absolute;
  text-transform: none;
  top: calc(100% + 0.25rem);
  transition: opacity 0.15s ease;
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
  white-space: normal;
  z-index: 10;

  a {
    color: ${colors.highlighted};
    font-weight: 600;
    text-decoration: underline;
  }

  @media (max-width: ${sizes.small.mediaQuery}) {
    font-size: 0.7rem;
    max-width: 9.5rem;
  }
`;

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

const Tooltip = ({ content, children }: TooltipProps): ReactElement => {
  const [visible, setVisible] = useState(false);
  const showTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(
    () => () => {
      if (showTimerRef.current) {
        globalThis.clearTimeout(showTimerRef.current);
      }
      if (hideTimerRef.current) {
        globalThis.clearTimeout(hideTimerRef.current);
      }
    },
    [],
  );

  const show = () => {
    if (hideTimerRef.current) {
      globalThis.clearTimeout(hideTimerRef.current);
    }
    showTimerRef.current = globalThis.setTimeout(() => {
      setVisible(true);
    }, SHOW_DELAY_MS);
  };

  const hide = () => {
    if (showTimerRef.current) {
      globalThis.clearTimeout(showTimerRef.current);
    }
    hideTimerRef.current = globalThis.setTimeout(() => {
      setVisible(false);
    }, HIDE_DELAY_MS);
  };

  return (
    <Wrapper
      data-zoom-control=""
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      <Content $visible={visible} role="tooltip">
        {content}
      </Content>
    </Wrapper>
  );
};

Tooltip.propTypes = {
  content: node.isRequired,
  children: node.isRequired,
};

export default Tooltip;
