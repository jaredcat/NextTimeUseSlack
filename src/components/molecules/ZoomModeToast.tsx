import { colors, sizes } from "@constants";
import styled from "@emotion/styled";
import { bool } from "prop-types";

const Toast = styled.div<{ $visible: boolean }>`
  background: rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  bottom: 2rem;
  color: ${colors.highlighted};
  font-size: ${sizes.buttonFontSize};
  left: 50%;
  line-height: 1.4;
  max-width: min(28rem, calc(100vw - 2rem));
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  padding: 0.75rem 1.25rem;
  pointer-events: none;
  position: fixed;
  text-align: center;
  transform: translateX(-50%);
  transition: opacity 0.3s ease;
  z-index: 1000;

  @media (max-width: ${sizes.small.mediaQuery}) {
    bottom: 1.25rem;
    font-size: ${sizes.small.buttonFontSize};
  }
`;

const ZoomModeToast = ({
  visible,
}: {
  visible: boolean;
}): React.ReactElement => (
  <Toast $visible={visible} role="status" aria-live="polite">
    Press Esc to exit zoom mode
  </Toast>
);

ZoomModeToast.propTypes = {
  visible: bool.isRequired,
};

export default ZoomModeToast;
