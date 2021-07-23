export type LoadingState = {
  loading: boolean;
};

export type LoadingAction = {
  type: string;
  loading: LoadingState["loading"];
};

export type LoadingContextType = {
  loading: LoadingState["loading"];
  setLoading: (loading: boolean) => void;
};
