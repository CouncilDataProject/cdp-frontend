import React, { FC, useCallback, useMemo, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import { useAppConfigContext } from "../../app";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import EventSearchService from "../../networking/EventSearchService";

import { MeetingCard } from "../../components/Cards/MeetingCard";
import { FiltersContainer } from "../../components/Filters/FiltersContainer";
import { FilterPopup } from "../../components/Filters/FilterPopup";
import useFilter from "../../components/Filters/useFilter";
import { SelectTextFilterOptions } from "../../components/Filters/SelectTextFilterOptions";
import { getSearchTypeText, searchTypeOptions } from "../../components/Layout/HomeSearchBar";
import FetchCardsStatus from "../../components/Shared/FetchCardsStatus";
import PageContainer from "../../components/Shared/PageContainer";
import SearchBar from "../../components/Shared/SearchBar";
import SearchPageTitle from "../../components/Shared/SearchPageTitle";
import useFetchData, { FetchDataActionType } from "../FetchDataContainer/useFetchData";
import SearchResultContainer from "./SearchResultContainer";
import { SearchContainerData, SearchData } from "./types";
import { SEARCH_TYPE } from "../../pages/SearchPage/types";

import { strings } from "../../assets/LocalizedStrings";

const SEARCH_RESULT_NUM = 4;

const SearchContainer: FC<SearchContainerData> = ({ searchState }: SearchContainerData) => {
  const { firebaseConfig } = useAppConfigContext();

  const queryRef = useRef(searchState.query);
  const [query, setQuery] = useState(searchState.query);
  const searchTypeFilter = useFilter<boolean>({
    name: "Search Type",
    initialState: searchState.searchTypes,
    defaultDataValue: false,
    textRepFunction: getSearchTypeText,
    isRequired: true,
  });

  useDocumentTitle(queryRef.current ? `${strings.search} -- ${queryRef.current}` : strings.search);

  const fetchSearchData = useCallback(async () => {
    const eventSearchService = new EventSearchService(firebaseConfig);
    const matchingEventsPromise = searchTypeFilter.state.events
      ? eventSearchService.searchEvents(query)
      : Promise.resolve([]);
    const [matchingEvents] = await Promise.all([matchingEventsPromise]);
    //sort matching events by weighted relevance with order desc
    matchingEvents.sort((a, b) => b.datetimeWeightedRelevance - a.datetimeWeightedRelevance);
    //TODO: add matching legislations

    const renderableEventsPromise = Promise.all(
      matchingEvents
        .slice(0, SEARCH_RESULT_NUM)
        .map((matchingEvent) => eventSearchService.getRenderableEvent(matchingEvent))
    );
    const [renderableEvents] = await Promise.all([renderableEventsPromise]);
    //TODO: add renderable legislations
    return Promise.resolve({
      event: {
        isRequested: searchTypeFilter.state.events,
        total: matchingEvents.length,
        events: renderableEvents,
      },
    });
  }, [query, searchTypeFilter.state, firebaseConfig]);

  const { state, dispatch } = useFetchData<SearchData>(
    {
      isLoading: false,
      error: null,
      hasFetchRequest: true,
      data: {
        event: {
          isRequested: false,
          total: 0,
          events: [],
        },
      },
    },
    fetchSearchData
  );

  const location = useLocation();
  const handleSearch = useCallback(() => {
    queryRef.current = query;
    const queryParams = `?q=${query.trim().replace(/\s+/g, "+")}`;
    // # is because the react-router-dom BrowserRouter is used
    history.pushState({}, "", `#${location.pathname}${queryParams}`);
    dispatch({ type: FetchDataActionType.FETCH });
  }, [query, location, dispatch]);

  const eventCards = useMemo(() => {
    if (!state.data?.event) {
      return [];
    }
    return state.data.event.events.map((renderableEvent) => {
      const eventDateTimeStr = renderableEvent.event.event_datetime?.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }) as string;
      return {
        link: `/${SEARCH_TYPE.EVENT}/${renderableEvent.event.id}`,
        jsx: (
          <MeetingCard
            staticImgSrc={renderableEvent.staticThumbnailURL}
            hoverImgSrc={renderableEvent.hoverThumbnailURL}
            imgAlt={`${renderableEvent.event.body?.name} - ${eventDateTimeStr}`}
            meetingDate={eventDateTimeStr}
            committee={renderableEvent.event.body?.name as string}
            tags={renderableEvent.keyGrams}
            excerpt={renderableEvent.selectedContextSpan}
            //TODO: add the gram and queryRef.current
          />
        ),
      };
    });
  }, [state.data?.event]);

  //TODO: add the legislation cards

  return (
    <PageContainer>
      <SearchPageTitle>
        <h1 className="mzp-u-title-xs">Search Results</h1>
        <SearchBar
          placeholder={strings.search_topic_placeholder}
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />
      </SearchPageTitle>
      <FiltersContainer>
        <div>
          <FilterPopup
            name={searchTypeFilter.name}
            clear={searchTypeFilter.clear}
            getTextRep={searchTypeFilter.getTextRep}
            isActive={searchTypeFilter.isActive}
            popupIsOpen={searchTypeFilter.popupIsOpen}
            setPopupIsOpen={searchTypeFilter.setPopupIsOpen}
            closeOnChange={false}
            hasRequiredError={searchTypeFilter.hasRequiredError()}
            handlePopupClose={handleSearch}
          >
            <SelectTextFilterOptions
              name={searchTypeFilter.name}
              state={searchTypeFilter.state}
              update={searchTypeFilter.update}
              options={searchTypeOptions}
            />
          </FilterPopup>
        </div>
      </FiltersContainer>
      <Loader active={state.hasFetchRequest} size="massive" />
      {state.error && <FetchCardsStatus>{state.error.toString()}</FetchCardsStatus>}
      <SearchResultContainer
        query={queryRef.current}
        isVisible={(!state.hasFetchRequest && state.data?.event.isRequested) || false}
        searchType={SEARCH_TYPE.EVENT}
        total={state.data?.event.total || 0}
        cards={eventCards}
      />
    </PageContainer>
  );
};

export default SearchContainer;
