import {
  getFeedsApi,
  getOrderByNumberApi,
  TFeedsResponse,
  TOrderResponse
} from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const numberedThunk = createAsyncThunk(
  'feed/getOrderByNumberApi',
  getOrderByNumberApi
);

type TNumberedSlice = {
  order: TOrder | null;
};

const numberedState: TNumberedSlice = {
  order: null
};

export const numberedSlice = createSlice({
  name: 'numberedReducer',
  initialState: numberedState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(numberedThunk.fulfilled, (state, action) => {
      state.order = action.payload.orders[0];
    });
  }
});
