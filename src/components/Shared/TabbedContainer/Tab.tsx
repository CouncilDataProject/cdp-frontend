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
  /** when the user clicks this tab, this function executes */
  setActive: (index: number) => void;
  /** whether or not this tab is selected */
  isActive: boolean;
  /** the index of the tab */
  index: number;
  /**
   * the components to display as tab labels.
   * this can be simple <p>s or be combination of icons and strings.
   **/
  children?: JSX.Element[];
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
