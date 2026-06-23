import { colors, sizes } from "@constants";
import styled from "@emotion/styled";
import { func } from "prop-types";
import { useState } from "react";
import { animated as a, useSpring } from "react-spring";

const Button = styled(a.button)`
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: ${colors.highlighted};
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  margin: 20px;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  transform-origin: center center;
  width: 50px;

  @media (max-width: ${sizes.small.mediaQuery}) {
    height: 44px;
    margin: 0;
    right: -0.25rem;
    top: -2.75rem;
    width: 44px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;

const CloseIcon = () => (
  <svg aria-hidden="true" height="24" viewBox="0 0 24 24" width="24">
    <path
      d="M6 6l12 12M18 6L6 18"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2.5"
    />
  </svg>
);
const ResetButton = ({
  resetState,
}: {
  resetState(): void;
}): React.ReactElement => {
  const [clicked, setClicked] = useState<boolean>(false);
  const contentProps = useSpring({
    reset: true,
    from: { transform: `rotate(0deg)` },
    to: {
      transform: `rotate(${clicked ? 360 : 0}deg)`,
    },
    onRest: () => setClicked(false),
  });

  const handleOnClick = () => {
    resetState();
    setClicked(true);
  };

  return (
    <Button
      style={contentProps}
      type="button"
      onClick={handleOnClick}
      title="Clear all input"
    >
      <CloseIcon />
    </Button>
  );
};

ResetButton.propTypes = {
  resetState: func.isRequired,
};

export default ResetButton;
