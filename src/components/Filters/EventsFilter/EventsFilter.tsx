import React, { FC, useState } from "react";
import styled from "@emotion/styled";

import Body from "../../../models/Body";

import { FilterPopup } from "../FilterPopup";
import { Filter } from "../useFilter";
import { SelectDateRange } from "../SelectDateRange";
import { SelectSorting } from "../SelectSorting";
import { SortOption } from "../SelectSorting/getSortingText";
import { SelectTextFilterOptions } from "../SelectTextFilterOptions";

import { screenWidths } from "../../../styles/mediaBreakpoints";

const Filters = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  [`@media (min-width:${screenWidths.tablet})`]: {
    flexDirection: "row",
    flexWrap: "wrap",
    "& > div:last-of-type": {
      marginLeft: "auto",
    },
  },
});

interface EventsFilterProps {
  allBodies: Body[];
  filters: Filter<any>[];
  sortOptions: SortOption[];
  handlePopupClose(): void;
}

const EventsFilter: FC<EventsFilterProps> = ({
  allBodies,
  filters,
  sortOptions,
  handlePopupClose,
}) => {
  const [committeeFilter, dateRangeFilter, sortFilter] = filters;
  const [committeeQuery, setCommitteeQuery] = useState("");

  const getCommitteeNameOptions = () => {
    return allBodies.map((body) => {
      return {
        name: body.id as string,
        label: body.name as string,
        disabled: false,
      };
    });
  };

  const handleSortingPopupClose = () => {
    sortFilter.setPopupIsOpen(false);
    handlePopupClose();
  };

  return (
    <Filters>
      <div>
        <FilterPopup
          clear={committeeFilter.clear}
          getTextRep={committeeFilter.getTextRep}
          isActive={committeeFilter.isActive}
          popupIsOpen={committeeFilter.popupIsOpen}
          setPopupIsOpen={committeeFilter.setPopupIsOpen}
          handlePopupClose={handlePopupClose}
          closeOnChange={false}
        >
          <SelectTextFilterOptions
            name={committeeFilter.name}
            state={committeeFilter.state}
            update={committeeFilter.update}
            options={getCommitteeNameOptions()}
            optionQuery={committeeQuery}
            setOptionQuery={setCommitteeQuery}
          />
        </FilterPopup>
      </div>
      <div>
        <FilterPopup
          clear={dateRangeFilter.clear}
          getTextRep={dateRangeFilter.getTextRep}
          isActive={dateRangeFilter.isActive}
          popupIsOpen={dateRangeFilter.popupIsOpen}
          setPopupIsOpen={dateRangeFilter.setPopupIsOpen}
          handlePopupClose={handlePopupClose}
          closeOnChange={false}
        >
          <SelectDateRange state={dateRangeFilter.state} update={dateRangeFilter.update} />
        </FilterPopup>
      </div>
      <div>
        <FilterPopup
          clear={sortFilter.clear}
          getTextRep={sortFilter.getTextRep}
          isActive={sortFilter.isActive}
          popupIsOpen={sortFilter.popupIsOpen}
          setPopupIsOpen={sortFilter.setPopupIsOpen}
          handlePopupClose={handlePopupClose}
          closeOnChange={true}
        >
          <SelectSorting
            sortOptions={sortOptions}
            state={sortFilter.state}
            update={sortFilter.update}
            onPopupClose={handleSortingPopupClose}
          />
        </FilterPopup>
      </div>
    </Filters>
  );
};

export default EventsFilter;
