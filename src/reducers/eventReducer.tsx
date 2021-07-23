import { DateTime } from "luxon";
import { EventReducerTypes } from "../constants";
import { EventAction, EventState } from "../types/Event";

export const EventInitialState: EventState = {
  startTime: DateTime.local(),
  endTime: DateTime.local().plus({ hours: 1 }),
  events: [],
  filter: {
    filterOptions: [],
    filterValue: "",
  },
};

export const eventReducer = (
  prevState: EventState,
  action: EventAction
): EventState => {
  switch (action.type) {
    case EventReducerTypes.SET_EVENTS:
      return {
        ...prevState,
        events: action.item.events,
      };
    case EventReducerTypes.SET_FILTER_OPTIONS:
      return {
        ...prevState,
        filter: {
          ...prevState.filter,
          filterOptions: action.item.filter.filterOptions,
        },
      };
    case EventReducerTypes.SET_FILTER_VALUE:
      return {
        ...prevState,
        filter: {
          ...prevState.filter,
          filterValue: action.item.filter.filterValue,
        },
      };
    case EventReducerTypes.SET_START_TIME:
      return {
        ...prevState,
        startTime: action.item.startTime,
      };
    case EventReducerTypes.SET_END_TIME:
      return {
        ...prevState,
        endTime: action.item.endTime,
      };
    default:
      return EventInitialState;
  }
};
