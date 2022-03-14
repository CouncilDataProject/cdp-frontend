import React, { FC } from "react";
import styled from "@emotion/styled";

import { MATTER_STATUS_DECISION } from "../../../models/constants";
import { Dot, DOT_SIZE, DOT_MARGIN } from "../../Shared/Dot";

const PROGRESS_BAR_HEIGHT = 29;
const MID_POINT = `calc(50% + ${DOT_SIZE / 2}px + ${DOT_MARGIN + 2}px)`;

const Progress = styled.div({
  height: PROGRESS_BAR_HEIGHT,
  position: "relative",
});

const Steps = styled.div<{ width: string; zIndex: number }>((props) => ({
  position: "absolute",
  top: 0,
  left: 0,
  height: PROGRESS_BAR_HEIGHT,
  width: props.width,
  borderTopLeftRadius: "50em",
  borderBottomLeftRadius: "50em",
  borderTopRightRadius: "50em",
  borderBottomRightRadius: "50em",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: props.zIndex,
  "& > div:first-of-type": {
    marginLeft: DOT_MARGIN,
  },
  "& > div:last-of-type": {
    marginRight: DOT_MARGIN,
  },
}));

const Checkpoints = styled.div({
  display: "flex",
  justifyContent: "space-between",
  "& > div": {
    fontWeight: 500,
  },
});

const MATTER_STATUS_DECISION_COLOR = {
  [MATTER_STATUS_DECISION.ADOPTED]: ["cdp-bg-acceptance-green", "cdp-bg-light-acceptance_green"],
  [MATTER_STATUS_DECISION.REJECTED]: ["cdp-bg-rejected-red", "cdp-bg-light-rejected_red"],
  [MATTER_STATUS_DECISION.IN_PROGRESS]: [
    "cdp-bg-in-progress_orange",
    "cdp-bg-light-in_progress_orange",
  ],
};

interface ProgressBarProps {
  status: MATTER_STATUS_DECISION;
}

const ProgressBar: FC<ProgressBarProps> = ({ status }: ProgressBarProps) => {
  const completedColor = MATTER_STATUS_DECISION_COLOR[status];
  const inProgress = status === MATTER_STATUS_DECISION.IN_PROGRESS;

  return (
    <div>
      <Progress>
        <Steps className={completedColor[1]} width={inProgress ? MID_POINT : "100%"} zIndex={2}>
          <Dot className={completedColor[0]} />
          <Dot className={completedColor[0]} />
          {!inProgress && <Dot className={completedColor[0]} />}
        </Steps>
        <Steps className="cdp-bg-light-neutral_grey" width="100%" zIndex={1}>
          <Dot className="cdp-bg-neutral-grey" />
          <Dot className="cdp-bg-neutral-grey" />
          <Dot className="cdp-bg-neutral-grey" />
        </Steps>
      </Progress>
      <Checkpoints>
        <div>Introduced</div>
        <div>{MATTER_STATUS_DECISION.IN_PROGRESS}</div>
        <div style={{ opacity: inProgress ? "0.75" : "1" }}>
          {inProgress ? MATTER_STATUS_DECISION.ADOPTED : status}
        </div>
      </Checkpoints>
    </div>
  );
};

export default ProgressBar;
