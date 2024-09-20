import { getIngredientsApi } from '../../utils/burger-api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ConstructorPageUIProps } from 'src/components/ui/pages/constructor-page/type';

export const constructorThunk = createAsyncThunk(
  'constructor/getIngredients',
  getIngredientsApi
);

export const initialConstructorState: ConstructorPageUIProps = {
  isIngredientsLoading: true,
  data: []
};

export const constructorSlice = createSlice({
  name: 'constructorReducer',
  initialState: initialConstructorState,
  reducers: {
    constructor: (state: ConstructorPageUIProps) => {
      state.isIngredientsLoading = true;
      state.data = [];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(constructorThunk.pending, (state) => {
      state.isIngredientsLoading = true;
    });
    builder.addCase(constructorThunk.rejected, (state) => {
      state.isIngredientsLoading = true;
    });
    builder.addCase(constructorThunk.fulfilled, (state, action) => {
      state.isIngredientsLoading = false;
      state.data = action.payload;
    });
  },
  selectors: {
    selectBuns: (state: ConstructorPageUIProps) =>
      state.data.filter((i) => i.type === 'bun'),
    selectMains: (state: ConstructorPageUIProps) =>
      state.data.filter((i) => i.type === 'main'),
    selectSauces: (state: ConstructorPageUIProps) =>
      state.data.filter((i) => i.type === 'sauce'),
    selectConstructorState: (state: ConstructorPageUIProps) => state
  }
});

export const { selectBuns, selectMains, selectSauces, selectConstructorState } =
  constructorSlice.selectors;

export const constructorReducer = constructorSlice.reducer;

export const { constructor } = constructorSlice.actions;
