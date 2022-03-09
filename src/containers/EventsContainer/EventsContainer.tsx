import React, { FC, useCallback, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";
import { Loader } from "semantic-ui-react";

import { useAppConfigContext, useLanguageConfigContext } from "../../app";
import useFetchModels, {
  FetchModelsActionType,
  FetchModelsState,
} from "../../hooks/useFetchModels";
import { ORDER_DIRECTION, OR_QUERY_LIMIT_NUM } from "../../networking/constants";
import EventService, { RenderableEvent } from "../../networking/EventService";

import { MeetingCard } from "../../components/Cards/MeetingCard";
import useFilter from "../../components/Filters/useFilter";
import { EventsFilter } from "../../components/Filters/EventsFilter";
import { getDateText } from "../../components/Filters/SelectDateRange";
import { getSortingText } from "../../components/Filters/SelectSorting";
import {
  getCheckboxText,
  getSelectedOptions,
} from "../../components/Filters/SelectTextFilterOptions";
import FetchCardsStatus from "../../components/Shared/FetchCardsStatus";
import PageContainer from "../../components/Shared/PageContainer";
import SearchBar from "../../components/Shared/SearchBar";
import SearchPageTitle from "../../components/Shared/SearchPageTitle";
import ShowMoreCards from "../../components/Shared/ShowMoreCards";
import { CardsContainer } from "../CardsContainer";
import { EventsData } from "./types";
import { SearchEventsState } from "../../pages/SearchEventsPage/types";
import { SEARCH_TYPE } from "../../pages/SearchPage/types";

import { strings } from "../../assets/LocalizedStrings";
import { FETCH_CARDS_BATCH_SIZE } from "../../constants/ProjectConstants";
import { screenWidths } from "../../styles/mediaBreakpoints";

interface EventsContainerProps extends EventsData {
  initialSelectedBodies: Record<string, boolean>;
}

const EventsContainer: FC<EventsContainerProps> = ({
  bodies,
  initialSelectedBodies,
}: EventsContainerProps) => {
  const { firebaseConfig } = useAppConfigContext();
  const { language } = useLanguageConfigContext();

  const dateRangeFilter = useFilter<string>({
    name: strings.date,
    initialState: { start: "", end: "" },
    defaultDataValue: "",
    textRepFunction: getDateText,
  });
  const committeeFilter = useFilter<boolean>({
    name: strings.committee,
    initialState: bodies.reduce((obj, body) => {
      obj[body.id as string] = initialSelectedBodies[body.id as string] || false;
      return obj;
    }, {} as Record<string, boolean>),
    defaultDataValue: false,
    textRepFunction: getCheckboxText,
    limit: OR_QUERY_LIMIT_NUM,
  });
  const sortFilter = useFilter<string>({
    name: "Sort",
    initialState: {
      by: "event_datetime",
      order: ORDER_DIRECTION.desc,
      label: strings.newest_first,
    },
    defaultDataValue: "",
    textRepFunction: getSortingText,
  });

  const getStartAfterDateFunctionCreator = useCallback(
    (state: FetchModelsState<RenderableEvent>) => () => {
      return !state.fetchModels && state.models.length > 0
        ? state.models[state.models.length - 1].event_datetime
        : undefined;
    },
    []
  );

  const fetchEventsFunctionCreator = useCallback(
    (batchSize: number, startAfterValue?: Date) => async () => {
      const eventService = new EventService(firebaseConfig);
      const events = await eventService.getEvents(
        batchSize,
        getSelectedOptions(committeeFilter.state),
        {
          start: dateRangeFilter.state.start ? new Date(dateRangeFilter.state.start) : undefined,
          end: dateRangeFilter.state.end ? new Date(dateRangeFilter.state.end) : undefined,
        },
        {
          by: sortFilter.state.by,
          order: sortFilter.state.order as ORDER_DIRECTION,
        },
        startAfterValue
      );
      const renderableEvents = await Promise.all(
        events.map((event) => {
          return eventService.getRenderableEvent(event);
        })
      );
      return Promise.resolve(renderableEvents);
    },
    [firebaseConfig, committeeFilter.state, dateRangeFilter.state, sortFilter.state]
  );

  const isDesktop = useMediaQuery({ query: `(min-width: ${screenWidths.desktop})` });
  const { state, dispatch } = useFetchModels(
    {
      batchSize: FETCH_CARDS_BATCH_SIZE - (isDesktop ? 1 : 0),
      models: [],
      fetchModels: true,
      showMoreModels: false,
      hasMoreModels: false,
      error: null,
    },
    getStartAfterDateFunctionCreator,
    fetchEventsFunctionCreator
  );

  const history = useHistory<SearchEventsState>();
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = () => {
    const queryParams = `?q=${searchQuery.trim().replace(/\s+/g, "+")}`;

    history.push({
      pathname: `/${SEARCH_TYPE.EVENT}/search`,
      search: queryParams,
      state: {
        query: searchQuery.trim(),
        committees: committeeFilter.state,
        dateRange: dateRangeFilter.state,
      },
    });
  };

  const handlePopupClose = useCallback(() => {
    dispatch({ type: FetchModelsActionType.FETCH_MODELS, payload: true });
  }, [dispatch]);

  const handleShowMoreEvents = useCallback(
    () => dispatch({ type: FetchModelsActionType.FETCH_MODELS, payload: false }),
    [dispatch]
  );

  const fetchEventsResult = useMemo(() => {
    if (state.fetchModels) {
      return <Loader active size="massive" />;
    } else if (state.error) {
      return <FetchCardsStatus>{state.error.toString()}</FetchCardsStatus>;
    } else if (state.models.length === 0) {
      return <FetchCardsStatus>{strings.no_results_found}</FetchCardsStatus>;
    } else {
      const cards = state.models.map((event) => {
        const eventDateTimeStr = event.event_datetime?.toLocaleDateString(language, {
          month: "long",
          day: "numeric",
          year: "numeric",
        }) as string;
        return {
          link: `/${SEARCH_TYPE.EVENT}/${event.id}`,
          jsx: (
            <MeetingCard
              staticImgSrc={event.staticThumbnailURL}
              hoverImgSrc={event.hoverThumbnailURL}
              imgAlt={`${event.body?.name} - ${eventDateTimeStr}`}
              meetingDate={eventDateTimeStr}
              committee={event.body?.name as string}
              tags={event.keyGrams}
            />
          ),
        };
      });
      return <CardsContainer cards={cards} />;
    }
  }, [state.fetchModels, state.error, state.models, language]);

  return (
    <PageContainer>
      <SearchPageTitle>
        <h1 className="mzp-u-title-sm">{strings.events}</h1>
        <SearchBar
          placeholder={strings.search_topic_placeholder}
          query={searchQuery}
          setQuery={setSearchQuery}
          handleSearch={handleSearch}
        />
      </SearchPageTitle>
      <EventsFilter
        allBodies={bodies}
        filters={[committeeFilter, dateRangeFilter, sortFilter]}
        sortOptions={[
          { by: "event_datetime", order: ORDER_DIRECTION.desc, label: strings.newest_first },
          { by: "event_datetime", order: ORDER_DIRECTION.asc, label: strings.oldest_first },
        ]}
        handlePopupClose={handlePopupClose}
      />
      {fetchEventsResult}
      <ShowMoreCards isVisible={state.hasMoreModels && !state.fetchModels}>
        <button className="mzp-c-button mzp-t-secondary mzp-t-lg" onClick={handleShowMoreEvents}>
          <span>{strings.show_more}</span>
          <Loader inline active={state.showMoreModels} size="tiny" />
        </button>
      </ShowMoreCards>
    </PageContainer>
  );
};

export default EventsContainer;
