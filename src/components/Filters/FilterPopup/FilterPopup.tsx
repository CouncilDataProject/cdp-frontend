import React, { Dispatch, FunctionComponent, Fragment, ReactNode, useRef } from "react";
import styled from "@emotion/styled";
import { some } from "lodash";
import { Popup } from "semantic-ui-react";

import ChevronDownIcon from "../../Shared/ChevronDownIcon";

import { strings } from "../../../assets/LocalizedStrings";

import "@mozilla-protocol/core/protocol/css/protocol.css";

const TriggerButton = styled.button({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});
TriggerButton.displayName = "TriggerButton";

const StyledPopup = styled(Popup)({
  // limit the width of the popup
  minWidth: "300px !important",
  maxWidth: "100% !important",
  boxShadow: "none !important",
  border: "2px solid #9595a2 !important",
});
StyledPopup.displayName = "StyledPopup";

const ContentContainer = styled(Popup.Content)({
  // add scrollbar if the content is too long
  flexGrow: 1,
  overflowY: "auto",
  paddingLeft: "10px",
  paddingRight: "10px",
});
ContentContainer.displayName = "ContentContainer";

const PopupContainer = styled.div({
  // limit the height of the popup
  maxHeight: "45vh",
  display: "flex",
  flexDirection: "column",
});
PopupContainer.displayName = "PopupContainer";

const ButtonContainer = styled.div({
  // evenly space the clear and save buttons
  display: "flex",
  justifyContent: "space-between",
  padding: ".833em 0 0",
});
ButtonContainer.displayName = "ButtonContainer";

export interface FilterPopupProps {
  /**Callback to reset the filter state. */
  clear(): void;
  /**Get the text representation of the filter state. */
  getTextRep(): string;
  /**Whether the filter state is active. */
  isActive(): boolean;
  /**Whether the filter popup is open. */
  popupIsOpen: boolean;
  /**React Dispatch callback to update the popupIsOpen state. */
  setPopupIsOpen: Dispatch<boolean>;
  /**Callback to handle filter popup closing. */
  handlePopupClose?(): void;
  /**Whether or not the popup should close when a value is selected. */
  closeOnChange: boolean;
  /**React Child Node. One of the filter components such as SelectDateRange, SelectTextFilterOptions, SelectSorting. */
  children: ReactNode;
  /**At least one option is selected regarding the filter? */
  hasRequiredError?: boolean;
  /**The number of selected options exceeded the allowed limit of selected options? */
  hasLimitError?: boolean;
}

/**
 * Display a button to trigger the opening of filter popup containing filtering React components such as
 * SelectDateRange, SelectTextFilterOptions, SelectSorting.
 */
const FilterPopup: FunctionComponent<FilterPopupProps> = ({
  clear,
  getTextRep,
  isActive,
  popupIsOpen,
  setPopupIsOpen,
  handlePopupClose,
  closeOnChange,
  children,
  hasRequiredError,
  hasLimitError,
}: FilterPopupProps) => {
  const mountNodeRef = useRef<HTMLDivElement>(null);

  const onPopupOpen = () => {
    setPopupIsOpen(true);
  };

  const onPopupClose = () => {
    setPopupIsOpen(false);
    if (handlePopupClose) {
      handlePopupClose();
    }
  };

  const onClearFilter = () => {
    clear();
  };

  const hasError = some([hasRequiredError, hasLimitError]);

  return (
    <Fragment>
      <StyledPopup
        basic
        flowing
        context={mountNodeRef.current || undefined}
        on="click"
        onClose={onPopupClose}
        onOpen={onPopupOpen}
        open={popupIsOpen}
        pinned={true}
        offset={[0, -5]}
        position="bottom left"
        positionFixed={true}
        trigger={
          <TriggerButton className="mzp-c-button mzp-t-lg mzp-t-neutral">
            {getTextRep()}
            <div style={{ marginLeft: 24, width: 16, height: 16 }}>
              <ChevronDownIcon />
            </div>
          </TriggerButton>
        }
      >
        <PopupContainer>
          <ContentContainer>{children}</ContentContainer>
          {!closeOnChange && (
            <ButtonContainer>
              <button
                className="mzp-c-button mzp-t-md mzp-t-neutral"
                disabled={!isActive()}
                onClick={onClearFilter}
              >
                {strings.clear}
              </button>
              <button
                className="mzp-c-button mzp-t-md mzp-t-product"
                disabled={hasError}
                onClick={onPopupClose}
              >
                {strings.save}
              </button>
            </ButtonContainer>
          )}
        </PopupContainer>
      </StyledPopup>
      <div ref={mountNodeRef} />
    </Fragment>
  );
};

export default FilterPopup;
