import styled from "@emotion/styled";
import type { FC, ReactNode } from "react";

const Row = styled.div``;

const TextRow: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => <Row>{children}</Row>;

export default TextRow;
