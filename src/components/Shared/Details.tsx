import React, { FC, ReactNode } from "react";
import styled from "@emotion/styled";

const Summary = styled.summary({
  "&::before": {
    // remove mozilla protocol +/- icon
    content: "none",
  },
  paddingRight: 0,
});

interface DetailsProps {
  summaryContent: ReactNode;
  hiddenContent: ReactNode;
  defaultOpen: boolean;
}

const Details: FC<DetailsProps> = ({
  summaryContent,
  hiddenContent,
  defaultOpen,
}: DetailsProps) => {
  return (
    <details open={defaultOpen}>
      <Summary>{summaryContent}</Summary>
      {hiddenContent}
    </details>
  );
};

export default Details;
