import { DateTime } from "luxon";
import { Moment } from "moment";
import { useMainContext } from "../../../hooks/useMainContext";
import { convertMomentToDateTime } from "../../../utils";

interface Response {
  start: DateTime;
  end: DateTime;
  nameFilterValue: null | string;
  nameFilterOptions: Array<string>;
  onStartChange: (value: Moment | string) => void;
  onEndChange: (value: Moment | string) => void;
  onFilterChange: (value: string | null) => void;
}

function useControlsBar(): Response {
  const {
    event: {
      state: {
        endTime,
        startTime,
        filter: { filterOptions, filterValue },
      },
      setFilterValue,
      setEndTime,
      setStartTime,
    },
  } = useMainContext();

  return {
    start: startTime,
    end: endTime,
    nameFilterValue: filterValue,
    nameFilterOptions: filterOptions,
    onStartChange: (time) => {
      const startTime = convertMomentToDateTime(time);
      setStartTime({ startTime });
    },
    onEndChange: (time) => {
      const endTime = convertMomentToDateTime(time);
      setEndTime({ endTime });
    },
    onFilterChange: (filterValue) => {
      setFilterValue({ filter: { filterValue } });
    },
  };
}

export default useControlsBar;
