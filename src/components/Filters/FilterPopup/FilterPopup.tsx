import React, { Dispatch, FunctionComponent, Fragment, ReactNode, useRef } from "react";
import styled from "@emotion/styled";
import { some } from "lodash";
import { Icon, Popup } from "semantic-ui-react";

import { strings } from "../../../assets/LocalizedStrings";

import "@mozilla-protocol/core/protocol/css/protocol.css";

// Matching the styles of a Mozilla Protocol select element
// https://protocol.mozilla.org/patterns/atoms/forms.html#select
const StyledSelect = styled.div({
  color: "rgba(0, 0, 0, 1) !important",
  boxShadow: "none !important",
  padding: "8px calc(1.5em + 16px) 8px 8px !important",
  borderRadius: "4px !important",
  border: "2px solid #9595a2 !important",
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='24px' height='24px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg stroke='none' stroke-width='1' fill='none' fill-rule='evenodd' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline stroke='%239595a3' stroke-width='2' points='5 9 12 16 19 9'%3E%3C/polyline%3E%3C/g%3E%3C/svg%3E"), linear-gradient(to bottom, #ffffff 0%, #ffffff 100%)`,
  backgroundPosition: "right 8px top 50% !important",
  backgroundRepeat: "no-repeat, repeat !important",
  display: "block !important",
  width: "100% !important",
  textOverflow: "ellipsis !important",
  lineHeight: "1.25 !important",
});
StyledSelect.displayName = "StyledSelect";

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

const MozillaProductButton = styled.button({
  color: "#ffffff",
  backgroundColor: "#0060df",
  border: "2px solid #000000",
  borderColor: "transparent",
  borderRadius: "4px",
  padding: "6px 24px",
  fontSize: "0.875rem",
});
MozillaProductButton.displayName = "MozillaProductButton";

const MozillaNeutralButton = styled.button({
  color: "#5e5e72",
  backgroundColor: "transparent",
  border: "2px solid #000000",
  borderColor: "#cdcdd4",
  borderRadius: "4px",
  padding: "6px 24px",
  fontSize: "0.875rem",
});
MozillaNeutralButton.displayName = "MozillaNeutralButton";

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
        trigger={<StyledSelect>{getTextRep()}</StyledSelect>}
      >
        <PopupContainer>
          <ContentContainer>{children}</ContentContainer>
          {!closeOnChange && (
            <ButtonContainer>
              <MozillaNeutralButton disabled={!isActive()} onClick={onClearFilter}>
                <Icon name="remove" /> {strings.clear}
              </MozillaNeutralButton>
              <MozillaProductButton disabled={hasError} onClick={onPopupClose}>
                <Icon name="checkmark" /> {strings.save}
              </MozillaProductButton>
            </ButtonContainer>
          )}
        </PopupContainer>
      </StyledPopup>
      <div ref={mountNodeRef} />
    </Fragment>
  );
};

export default FilterPopup;
