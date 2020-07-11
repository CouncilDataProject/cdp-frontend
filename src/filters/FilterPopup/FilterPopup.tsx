import React, { Dispatch, FunctionComponent, Fragment, ReactNode, useRef } from "react";

import styled from "@emotion/styled";
import { Button, Header, Icon, Popup } from "semantic-ui-react";

const ButtonContainer = styled.div({
  // evenly space the clear and save buttons
  display: "flex",
  justifyContent: "space-between",
  padding: "1em 0",
});
ButtonContainer.displayName = "ButtonContainer";

const StyledPopup = styled(Popup)({
  // limit the width of the popup
  minWidth: "300px !important",
  maxWidth: "90% !important",
  boxShadow: "none !important",
  "@media(max-width:500px)": {
    width: "86% !important",
  },
});
StyledPopup.displayName = "StyledPopup";

const ContentContainer = styled(Popup.Content)({
  // add scrollbar if the content is too long
  flexGrow: 1,
  overflowY: "auto",
  paddingRight: "10px",
});
ContentContainer.displayName = "ContentContainer";

const PopupContainer = styled.div({
  //limit the height of the popup
  maxHeight: "45vh",
  display: "flex",
  flexDirection: "column",
});
PopupContainer.displayName = "PopupContainer";

export interface FilterPopupProps {
  /**Callback to reset the filter state. */
  clear(): void;
  /**Get the text representation of the filter state. */
  getTextRep(): string;
  /**Whether the filter state is active. */
  isActive(): boolean;
  /**The header of filter. */
  header: string;
  /**Whether the filter popup is open. */
  popupIsOpen: boolean;
  /**React Dispatch callback to update the popupIsOpen state. */
  setPopupIsOpen: Dispatch<boolean>;
  /**Callback to handle filter popup closing. */
  handlePopupClose(): void;
  /**Whether or not the popup should close when a value is selected. */
  closeOnChange: boolean;
  /**React Child Node. One of the filter components such as SelectDateRange, SelectTextFilterOptions, SelectSorting. */
  children: ReactNode;
}

/**Display a button to trigger the opening of filter popup containing filtering React components such as
 * SelectDateRange, SelectTextFilterOptions, SelectSorting.
 */
const FilterPopup: FunctionComponent<FilterPopupProps> = ({
  clear,
  getTextRep,
  isActive,
  header,
  popupIsOpen,
  setPopupIsOpen,
  handlePopupClose,
  closeOnChange,
  children,
}: FilterPopupProps) => {
  const mountNodeRef = useRef(null);

  const onPopupOpen = () => {
    setPopupIsOpen(true);
  };

  const onPopupClose = () => {
    setPopupIsOpen(false);
    handlePopupClose();
  };

  const onClearFilter = () => {
    clear();
  };

  return (
    <Fragment>
      <StyledPopup
        basic
        flowing
        mountNode={mountNodeRef.current}
        on="click"
        onClose={onPopupClose}
        onOpen={onPopupOpen}
        open={popupIsOpen}
        pinned={true}
        offset="0, -5px"
        position="bottom left"
        positionFixed={true}
        trigger={
          <Button icon labelPosition="right" basic={!isActive()}>
            <Icon name="angle down" />
            {getTextRep()}
          </Button>
        }
      >
        <PopupContainer>
          <Header content={header} />
          <ContentContainer>{children}</ContentContainer>
          {!closeOnChange && (
            <ButtonContainer>
              <Button size="mini" disabled={!isActive()} onClick={onClearFilter}>
                <Icon name="remove" /> Clear
              </Button>
              <Button color="facebook" size="mini" onClick={onPopupClose}>
                <Icon name="checkmark" /> Save
              </Button>
            </ButtonContainer>
          )}
        </PopupContainer>
      </StyledPopup>
      <span ref={mountNodeRef} />
    </Fragment>
  );
};

export default FilterPopup;
