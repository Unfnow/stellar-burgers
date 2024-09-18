import { getOrderByNumberApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

export const numberedThunk = createAsyncThunk(
  'feed/getOrderByNumberApi',
  getOrderByNumberApi
);

type TNumberedSlice = {
  order: TOrder | null;
  isLoaded: boolean;
};

export const numberedState: TNumberedSlice = {
  order: null,
  isLoaded: false
};

export const numberedSlice = createSlice({
  name: 'numberedReducer',
  initialState: numberedState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(numberedThunk.pending, (state) => {
      state.isLoaded = false;
      return state;
    });
    builder.addCase(numberedThunk.rejected, (state) => {
      state.isLoaded = false;
      return state;
    });
    builder.addCase(numberedThunk.fulfilled, (state, action) => {
      state.isLoaded = true;
      state.order = action.payload.orders[0];
    });
  }
});

export const numberedReducer = numberedSlice.reducer;
