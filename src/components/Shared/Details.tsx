import React, { FC, ReactNode } from "react";
import styled from "@emotion/styled";

const Summary = styled.summary({
  "&::before": {
    // remove mozilla protocol +/- icon
    content: "none",
  },
});

interface DetailsProps {
  summaryContent: ReactNode;
  hiddenContent: ReactNode;
  defaultOpen: boolean;
  onToggle?: () => void;
}

const Details: FC<DetailsProps> = ({
  summaryContent,
  hiddenContent,
  defaultOpen,
  onToggle,
}: DetailsProps) => {
  return (
    <details open={defaultOpen} onToggle={onToggle}>
      <Summary>{summaryContent}</Summary>
      {hiddenContent}
    </details>
  );
};

export default Details;
