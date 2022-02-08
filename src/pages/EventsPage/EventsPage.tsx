import React, { FC, useCallback, useMemo } from "react";
import { useLocation } from "react-router-dom";

import { useAppConfigContext } from "../../app";
import useDocumentTitle from "../../hooks/useDocumentTitle";

import BodyService from "../../networking/BodyService";

import { EventsContainer } from "../../containers/EventsContainer";
import { EventsData } from "../../containers/EventsContainer/types";
import { FetchDataContainer } from "../../containers/FetchDataContainer";
import useFetchData from "../../containers/FetchDataContainer/useFetchData";

import { strings } from "../../assets/LocalizedStrings";

const EventsPage: FC = () => {
  const { firebaseConfig } = useAppConfigContext();
  useDocumentTitle(strings.events);

  const location = useLocation<{ committees: Record<string, boolean> }>();
  const eventsState = useMemo(() => {
    if (location.state) {
      return location.state;
    }
    return {
      committees: {},
    };
  }, [location]);

  const fetchEventsData = useCallback(async () => {
    const bodyService = new BodyService(firebaseConfig);
    const bodies = await bodyService.getAllBodies();
    return Promise.resolve({ bodies });
  }, [firebaseConfig]);

  const { state: eventsDataState } = useFetchData<EventsData>(
    {
      isLoading: false,
      error: null,
      hasFetchRequest: true,
    },
    fetchEventsData
  );

  return (
    <FetchDataContainer isLoading={eventsDataState.isLoading} error={eventsDataState.error}>
      {eventsDataState.data && (
        <EventsContainer {...eventsDataState.data} initialSelectedBodies={eventsState.committees} />
      )}
    </FetchDataContainer>
  );
};

export default EventsPage;
