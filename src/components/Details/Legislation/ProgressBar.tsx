import React, { FC } from "react";
import styled from "@emotion/styled";

import { MATTER_STATUS_DECISION } from "../../../models/constants";

const Input = styled.input({
  width: "100%",
  backgroundColor: "yellow",
});

const ProgressUl = styled.ul({
  display: "flex",
  justifyContent: "space-between",
  listStyle: "none",
});

interface ProgressBarProps {
  status: MATTER_STATUS_DECISION;
}

const ProgressBar: FC<ProgressBarProps> = ({ status }: ProgressBarProps) => {
  return (
    <>
      <Input
        readOnly
        aria-readonly
        aria-label="Legislation status"
        type="range"
        min={0}
        max={2}
        step={1}
        value={status === MATTER_STATUS_DECISION.IN_PROGRESS ? 1 : 2}
      />
      <ProgressUl>
        <li>Introduced</li>
        <li>{MATTER_STATUS_DECISION.IN_PROGRESS}</li>
        <li>
          {status === MATTER_STATUS_DECISION.IN_PROGRESS ? MATTER_STATUS_DECISION.ADOPTED : status}
        </li>
      </ProgressUl>
    </>
  );
};

export default ProgressBar;
