import React, { useState, FunctionComponent } from "react";
import { Tab } from "./Tab";
import styled from "@emotion/styled";

const TabHeaderContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  flex: 1,
});

export interface TabbedContainerProps {
  /** the components you want as the labels for the tabs.
   * Can be a string, or combination of icon/styled string
   */
  tabLabels: JSX.Element[];
  /**
   * the components to display as the pages.
   * this should match the number of labels provided.
   **/
  children?: JSX.Element[];
}

export const TabbedContainer: FunctionComponent<TabbedContainerProps> = ({
  tabLabels,
  children,
}: TabbedContainerProps) => {
  const [activeTab, setActiveTab] = useState(0);

  function tabTapped(index: number) {
    setActiveTab(index);
  }

  return (
    <React.Fragment>
      <TabHeaderContainer>
        {tabLabels.map((tabLabel, index) => {
          return (
            <Tab
              isActive={index === activeTab}
              index={index}
              key={`navTab-${index}`}
              setActive={tabTapped}
            >
              {tabLabel}
            </Tab>
          );
        })}
      </TabHeaderContainer>
      {children?.filter((childComponent, childIndex) => {
        return activeTab === childIndex;
      })}
    </React.Fragment>
  );
};
