import React, { FC, ReactNode } from "react";
import styled from "@emotion/styled";

import colors from "../../styles/colors";

const Summary = styled.summary<{ hasBorderBottom?: boolean }>((props) => ({
  "&::before": {
    // remove mozilla protocol +/- icon
    content: "none",
  },
  paddingRight: 0,
  paddingBottom: props.hasBorderBottom ? 8 : 0,
  borderBottom: props.hasBorderBottom ? `1px solid ${colors.grey}` : 0,
}));

interface DetailsProps {
  summaryContent: ReactNode;
  hiddenContent: ReactNode;
  defaultOpen: boolean;
  hasBorderBottom?: boolean;
}

const Details: FC<DetailsProps> = ({
  summaryContent,
  hiddenContent,
  defaultOpen,
  hasBorderBottom,
}: DetailsProps) => {
  return (
    <details open={defaultOpen}>
      <Summary hasBorderBottom={hasBorderBottom}>{summaryContent}</Summary>
      {hiddenContent}
    </details>
  );
};

export default Details;
