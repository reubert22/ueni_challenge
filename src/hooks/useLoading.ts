import { useReducer, useCallback } from "react";
import { LoadingReducerTypes } from "../constants";
import {
  loadingReducer,
  LoadingInitialState,
} from "../reducers/loadingReducer";

export const useLoading = () => {
  const [state, dispatch] = useReducer(loadingReducer, LoadingInitialState);

  const setLoading = useCallback((loading) => {
    dispatch({
      type: LoadingReducerTypes.SET_LOADING,
      loading,
    });
  }, []);

  return {
    loading: state.loading,
    setLoading,
  };
};
