import { sizes } from "@constants";
import styled from "@emotion/styled";
import type { FC, ReactNode } from "react";

const Row = styled.div`
  @media (max-width: ${sizes.small.mediaQuery}) {
    overflow-wrap: anywhere;
    word-break: break-word;
  }
`;

const TextRow: FC<{ children: ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => <Row>{children}</Row>;

export default TextRow;
