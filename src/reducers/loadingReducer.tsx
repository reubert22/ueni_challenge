import { LoadingReducerTypes } from "../constants";
import { LoadingAction, LoadingState } from "../types/Loading";

export const LoadingInitialState = {
  loading: false,
};

export const loadingReducer = (_: LoadingState, action: LoadingAction) => {
  switch (action.type) {
    case LoadingReducerTypes.SET_LOADING:
      return {
        loading: action.loading,
      };
    default:
      return LoadingInitialState;
  }
};
