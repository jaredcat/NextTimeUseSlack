import { node } from "prop-types";

const TextRow = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => <>{children}</>;

TextRow.propTypes = {
  children: node.isRequired,
};
export default TextRow;
