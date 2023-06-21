import {
  createSlice,
  isAnyOf,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

export interface FetchState {
  [type: string]: string;
}

export const getPrefix = (type: string) =>
  /(?<type>.*)\/(pending|fulfilled|rejected)/.exec(type)?.groups?.type;

export const fetchesSlice = createSlice({
  name: "fetches",
  initialState: {} as FetchState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state, { type, meta: { requestId } }) => {
        const key = getPrefix(type);
        if (key) {
          state[key] = requestId;
        }
      })
      .addMatcher(
        isAnyOf(isFulfilled, isRejected),
        (state, { type, meta: { requestId } }) => {
          const key = getPrefix(type);
          if (key && state[key] === requestId) {
            delete state[key];
          }
        },
      );
  },
  selectors: {
    selectRequestId: (state, typePrefix: string) => state[typePrefix],
    selectLoading: (state, typePrefix: string): boolean =>
      !!fetchesSlice.getSelectors().selectRequestId(state, typePrefix),
  },
});

export const {
  selectors: { selectRequestId, selectLoading },
} = fetchesSlice;
