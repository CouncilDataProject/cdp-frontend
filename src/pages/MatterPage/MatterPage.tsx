import React, { FC, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAppConfigContext } from "../../app";
import useFetchData from "../../containers/FetchDataContainer/useFetchData";
import FetchDataContainer from "../../containers/FetchDataContainer/FetchDataContainer";
import { MatterContainer } from "../../containers/MatterContainer";

import MatterStatus from "../../models/MatterStatus";
import IndexedMatterGram from "../../models/IndexedMatterGram";
import EventMinutesItem from "../../models/EventMinutesItem";
import Event from "../../models/Event";
import Person from "../../models/Person";
import Vote from "../../models/Vote";

import MatterService from "../../networking/MatterService";
import MatterStatusService from "../../networking/MatterStatusService";
import EventService from "../../networking/EventService";
import MatterSponsorService from "../../networking/MatterSponsorService";
import VoteService from "../../networking/VoteService";

interface MatterContainerType {
  matterStatus: MatterStatus;
  indexedMatterGrams: IndexedMatterGram[];
  event?: Event;
  sponsors: Person[];
  votes?: Vote[];
  legislationHistory: EventMinutesItem[];
}

const MatterPage: FC = () => {
  // Get the app config context
  const { firebaseConfig } = useAppConfigContext();
  // Get the id the matter, provided the route is `matter/:id`
  const { id } = useParams<{ id: string }>();

  const fetchMatterDetails = useCallback(async () => {
    const matterService = new MatterService(firebaseConfig);
    const matterStatusService = new MatterStatusService(firebaseConfig);
    const matterSponsorService = new MatterSponsorService(firebaseConfig);
    const eventService = new EventService(firebaseConfig);

    const matterPromise = matterService.getMatterById(id);
    const matterSponsorsPromise = matterSponsorService.getMatterSponsorByMatterId(id);
    const matterStatusesPromise = matterStatusService.getMatterStatusesByMatterId(id);
    const responses = await Promise.all([
      matterPromise,
      matterSponsorsPromise,
      matterStatusesPromise,
    ]);
    const [matter, matterSponsors, matterStatuses] = responses; // javascript array destructuring shorthand
    const sponsors = matterSponsors
      .filter((matterSponsor) => {
        return matterSponsor.person;
      })
      .map((matterSponsor) => {
        return matterSponsor.person as Person;
      });
    const legislationHistory = matterStatuses.reduce((filtered, optional) => {
      if (optional.event_minutes_item) {
        filtered.push(optional.event_minutes_item);
      }
      return filtered;
    }, [] as EventMinutesItem[]);

    const latestStatus = matterStatuses[0];
    latestStatus.matter = matter;
    const matterContainerData: MatterContainerType = {
      matterStatus: latestStatus,
      indexedMatterGrams: [],
      sponsors,
      legislationHistory,
    };

    // loop through matterStatuses until we find one where the event_minutes_item is not null
    let latestEventMinutesItem: EventMinutesItem | undefined;
    for (const matterStatus of matterStatuses) {
      if (matterStatus.event_minutes_item) {
        latestEventMinutesItem = matterStatus.event_minutes_item;
        break;
      }
    }
    if (latestEventMinutesItem) {
      const votesService = new VoteService(firebaseConfig);
      const eventResponses = await Promise.all([
        votesService.getVotesByEventMinutesItemId(latestEventMinutesItem.id),
        eventService.getEventById(latestEventMinutesItem.event_ref),
      ]);
      matterContainerData.votes = eventResponses[0];
      matterContainerData.event = eventResponses[1];
    }
    return matterContainerData;
  }, [firebaseConfig, id]);

  const { state: matterDetailsState } = useFetchData<MatterContainerType>(
    {
      isLoading: false,
      error: null,
      hasFetchRequest: true,
    },
    fetchMatterDetails
  );

  return (
    <FetchDataContainer isLoading={matterDetailsState.isLoading} error={matterDetailsState.error}>
      {matterDetailsState.data && (
        <MatterContainer
          indexedMatterGrams={matterDetailsState.data.indexedMatterGrams}
          matterStatus={matterDetailsState.data.matterStatus}
          sponsors={matterDetailsState.data.sponsors}
          event={matterDetailsState.data.event}
          votes={matterDetailsState.data.votes}
          legislationHistory={matterDetailsState.data.legislationHistory}
        />
      )}
    </FetchDataContainer>
  );
};

export default MatterPage;
