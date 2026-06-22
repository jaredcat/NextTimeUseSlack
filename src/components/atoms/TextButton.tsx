import { colors, sizes } from "@constants";
import styled from "@emotion/styled";
import { func, string } from "prop-types";

const Button = styled.button`
  border: none;
  background: none;
  color: ${colors.highlighted};
  cursor: pointer;
  display: inline-block;
  font-size: ${({ fontSize }: { fontSize?: string | null }) =>
    fontSize || sizes.fontSize};
`;

interface TextButtonProps {
  children: string;
  type: "button" | "submit" | "reset";
  fontSize?: string | null;
  onClick(): void;
}

const TextButton = ({
  children,
  type,
  fontSize = null,
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

export default TextButton;
