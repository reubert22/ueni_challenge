import { DateTime } from "luxon";

export type EventType = {
  start: string;
  end: string;
  id: string;
  name: string;
};

export type EventState = {
  startTime: DateTime;
  endTime: DateTime;
  filter: {
    filterOptions: string[];
    filterValue: string;
  };
  events: EventType[];
};

export type EventAction = {
  type: string;
  item: {
    startTime: DateTime;
    endTime: DateTime;
    filter: {
      filterOptions: string[];
      filterValue: string;
    };
    events: EventType[];
  };
};

export type EventFilterType = {
  filterOptions: string[];
  filterValue: string;
};

export type EventContextType = {
  state: EventState;
  setEvents: (
    event: {
      start: string;
      end: string;
      id: string;
      name: string;
    }[]
  ) => void;
  setFilterOptions: (options: string[]) => void;
  setFilterValue: (value: { filter: { filterValue: string | null } }) => void;
  setEndTime: (value: { endTime: DateTime }) => void;
  setStartTime: (value: { startTime: DateTime }) => void;
};
