import { EventContextType } from "./Event";
import { LoadingContextType } from "./Loading";

export type MainContextType = {
  event: EventContextType;
  loading: LoadingContextType;
};
