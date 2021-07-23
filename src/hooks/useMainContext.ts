import { useContext, createContext } from "react";
import { DateTime } from "luxon";
import { MainContextType } from "../types/Context";

export const MainContext = createContext<MainContextType>({
  event: {
    state: {
      startTime: {} as DateTime,
      endTime: {} as DateTime,
      events: [],
      filter: {
        filterOptions: [],
        filterValue: "",
      },
    },
    setEvents: () => {},
    setEvent: () => {},
    setFilterOptions: () => {},
    setFilterValue: () => {},
    setEndTime: () => {},
    setStartTime: () => {},
  },
  loading: { loading: false, setLoading: () => {} },
});

export function useMainContext() {
  return useContext(MainContext);
}
