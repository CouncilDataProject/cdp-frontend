import React, { FC, useEffect } from "react";

import { useAppConfigContext } from "../../app";
import useDocumentTitle from "../../hooks/useDocumentTitle";

import BodyService from "../../networking/BodyService";

import { EventsData } from "../../containers/EventsContainer/types";
import useFetchData, {
  FetchDataActionType,
} from "../../containers/FetchDataContainer/useFetchData";
import FetchDataContainer from "../../containers/FetchDataContainer/FetchDataContainer";
import { EventsContainer } from "../../containers/EventsContainer";

import { createError } from "../../utils/createError";

import { strings } from "../../assets/LocalizedStrings";

const EventsPage: FC = () => {
  const { firebaseConfig } = useAppConfigContext();
  useDocumentTitle(strings.events);

  const { state: eventsDataState, dispatch: eventsDataDispatch } = useFetchData<EventsData>({
    isLoading: false,
  });

  useEffect(() => {
    let didCancel = false;
    const bodyService = new BodyService(firebaseConfig);

    const fetchEventsData = async () => {
      eventsDataDispatch({ type: FetchDataActionType.FETCH_INIT });

      try {
        const bodies = await bodyService.getAllBodies();

        if (!didCancel) {
          eventsDataDispatch({
            type: FetchDataActionType.FETCH_SUCCESS,
            payload: {
              bodies,
            },
          });
        }
      } catch (err) {
        if (!didCancel) {
          const error = createError(err);
          eventsDataDispatch({ type: FetchDataActionType.FETCH_FAILURE, payload: error });
        }
      }
    };

    fetchEventsData();

    return () => {
      didCancel = true;
    };
  }, [firebaseConfig]);

  return (
    <FetchDataContainer isLoading={eventsDataState.isLoading} error={eventsDataState.error}>
      {eventsDataState.data && <EventsContainer {...eventsDataState.data} />}
    </FetchDataContainer>
  );
};

export default EventsPage;
