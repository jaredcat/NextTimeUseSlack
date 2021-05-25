import { useState } from "react";
import { func } from "prop-types";
import styled from "@emotion/styled";
import { colors } from "@constants";
import { useSpring, animated as a } from "react-spring";

const Button = styled(a.button)`
  background: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  border: none;
  color: ${colors.highlighted};
  display: inline-block;
  font-size: 40px;
  height: 50px;
  width: 50px;
  line-height: 50px;
  margin: 20px;
  padding: 0;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  &:hover {
    background: rgba(255, 255, 255, 0.4);
  }
`;
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
      &times;
    </Button>
  );
};

ResetButton.propTypes = {
  resetState: func.isRequired,
};

export default ResetButton;
