import { string, func } from "prop-types";
import styled from "@emotion/styled";
import { sizes, colors } from "@constants";

const Button = styled.button`
  border: none;
  background: none;
  color: ${colors.highlighted};
  cursor: pointer;
  display: inline-block;
  font-size: ${({fontSize}:{fontSize: string}) => fontSize || sizes.fontSize};
`;

interface TextButtonProps {
  children: string;
  type: "button" | "submit" | "reset";
  fontSize: string;
  onClick(): void;
}

const TextButton = ({
  children,
  type,
  fontSize,
  onClick,
}: TextButtonProps): React.ReactElement => (
  <Button fontSize={fontSize} type={type} onClick={onClick}>
    {children}
  </Button>
);

TextButton.propTypes = {
  children: string.isRequired,
  type: string.isRequired,
  fontSize: string,
  onClick: func.isRequired,
};
TextButton.defaultProps = {
    fontSize: null
}

export default TextButton;
