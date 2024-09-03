import { getFeedsApi, TFeedsResponse } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const feedThunk = createAsyncThunk('feed/getFeedsApi', getFeedsApi);

type TFeedSlice = Omit<TFeedsResponse, 'success'> & {
  isLoaded: boolean;
};

const feedState: TFeedSlice = {
  orders: [],
  isLoaded: false,
  total: 0,
  totalToday: 0
};

export const feedSlice = createSlice({
  name: 'feedReducer',
  initialState: feedState,
  reducers: {
    feed: (state: TFeedSlice) => {
      state.orders = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(feedThunk.pending, (state) => {
      state.isLoaded = false;
      return state;
    });
    builder.addCase(feedThunk.rejected, (state) => {
      state.isLoaded = false;
      return state;
    });
    builder.addCase(feedThunk.fulfilled, (state, action) => {
      state.isLoaded = true;
      state.orders = [...action.payload.orders];
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
      return state;
    });
  },
  selectors: {
    selectFeed: (state: TFeedSlice) => state
  }
});

export const { selectFeed } = feedSlice.selectors;

export const { feed } = feedSlice.actions;
