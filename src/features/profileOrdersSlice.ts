import { getOrdersApi, TFeedsResponse } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const profileOrderThunk = createAsyncThunk(
  'profieOrder/getOrdersApi',
  getOrdersApi
);

type TFeedSlice = Omit<TFeedsResponse, 'success'> & {
  isLoaded: boolean;
};

const initialState: TFeedSlice = {
  orders: [],
  isLoaded: false,
  total: 0,
  totalToday: 0
};

export const profieOrderSlice = createSlice({
  name: 'profieOrderReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(profileOrderThunk.pending, (state) => {
      state.isLoaded = false;
      return state;
    });
    builder.addCase(profileOrderThunk.rejected, (state) => {
      state.isLoaded = false;
      return state;
    });
    builder.addCase(profileOrderThunk.fulfilled, (state, action) => {
      state.isLoaded = true;
      state.orders = action.payload;
      return state;
    });
  },
  selectors: {
    selectOrders: (state: TFeedSlice) => state
  }
});

export const { selectOrders } = profieOrderSlice.selectors;
