import React, { FC, useEffect } from "react";

import { useAppConfigContext } from "../../app";

import BodyService from "../../networking/BodyService";
import EventService from "../../networking/EventService";
import { ORDER_DIRECTION } from "../../networking/constants";

import { EventsData } from "../../containers/EventsContainer/types";
import useFetchData, {
  FetchDataActionType,
} from "../../containers/FetchDataContainer/useFetchData";
import FetchDataContainer from "../../containers/FetchDataContainer/FetchDataContainer";
import { EventsContainer } from "../../containers/EventsContainer";

import { createError } from "../../utils/createError";

const EventsPage: FC = () => {
  const { firebaseConfig } = useAppConfigContext();

  const { state: eventsDataState, dispatch: eventsDataDispatch } = useFetchData<EventsData>({
    isLoading: false,
  });

  useEffect(() => {
    let didCancel = false;
    const eventService = new EventService(firebaseConfig);
    const bodyService = new BodyService(firebaseConfig);

    const fetchEventsData = async () => {
      eventsDataDispatch({ type: FetchDataActionType.FETCH_INIT });

      try {
        const bodies = await bodyService.getAllBodies();
        const events = await eventService.getEvents(
          10,
          [],
          { start: undefined, end: undefined },
          {
            by: "event_datetime",
            order: ORDER_DIRECTION.desc,
          }
        );
        const renderableEvents = await Promise.all(
          events.map((event) => {
            return eventService.getRenderableEvent(event);
          })
        );

        if (!didCancel) {
          eventsDataDispatch({
            type: FetchDataActionType.FETCH_SUCCESS,
            payload: {
              bodies,
              events: renderableEvents,
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
