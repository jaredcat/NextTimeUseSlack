import styled from "@emotion/styled";
import { node } from "prop-types";
import type { FC, ReactNode } from "react";

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
