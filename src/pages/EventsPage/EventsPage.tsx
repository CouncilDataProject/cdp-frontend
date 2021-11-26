import React, { FC, useCallback } from "react";

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
      {eventsDataState.data && <EventsContainer {...eventsDataState.data} />}
    </FetchDataContainer>
  );
};

export default EventsPage;
