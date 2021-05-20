import React, { FunctionComponent } from "react";
import "@mozilla-protocol/core/protocol/css/protocol.css";
import styled from "@emotion/styled";
import { STYLES } from "../../../constants/StyleConstants";

const TabView = styled.div({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  flexDirection: "row",
  padding: 8,
});

type TabProps = {
  setActive: (index: number) => void;
  isActive: boolean;
  index: number;
};
export const Tab: FunctionComponent<TabProps> = ({
  isActive,
  index,
  setActive,
  children,
}: TabProps) => {
  const borderBottom = isActive ? `4px solid ${STYLES.COLORS.ACTIVE_UNDERLINE}` : "white";

  return (
    <TabView
      style={{ borderBottom }}
      onClick={() => {
        setActive(index);
      }}
      key={`tabHeader-${index}`}
    >
      {children}
    </TabView>
  );
};
