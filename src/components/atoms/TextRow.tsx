import { FC, ReactNode } from "react";
import { node } from "prop-types";
import styled from "@emotion/styled";

const Row = styled.div``;

const TextRow: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => <Row>{children}</Row>;

TextRow.propTypes = {
  children: node.isRequired,
};
export default TextRow;
