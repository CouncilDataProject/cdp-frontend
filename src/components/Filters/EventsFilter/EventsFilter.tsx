import React, { FC, useState } from "react";

import Body from "../../../models/Body";

import { FiltersContainer } from "../FiltersContainer";
import { FilterPopup } from "../FilterPopup";
import { Filter } from "../useFilter";
import { SelectDateRange } from "../SelectDateRange";
import { SelectSorting } from "../SelectSorting";
import { SortOption } from "../SelectSorting/getSortingText";
import { SelectTextFilterOptions } from "../SelectTextFilterOptions";

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
}: EventsFilterProps) => {
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
    <FiltersContainer>
      <div>
        <FilterPopup
          name={committeeFilter.name}
          clear={committeeFilter.clear}
          getTextRep={committeeFilter.getTextRep}
          isActive={committeeFilter.isActive}
          popupIsOpen={committeeFilter.popupIsOpen}
          setPopupIsOpen={committeeFilter.setPopupIsOpen}
          handlePopupClose={handlePopupClose}
          closeOnChange={false}
          hasLimitError={committeeFilter.hasLimitError()}
          limit={committeeFilter.limit}
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
          name={dateRangeFilter.name}
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
          name={sortFilter.name}
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
    </FiltersContainer>
  );
};

export default EventsFilter;
