import { orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUIProps } from '../../components/ui/burger-constructor/type';
import { v4 } from 'uuid';

export const orderThunk = createAsyncThunk(
  'order/orderBurgerApi',
  orderBurgerApi
);

export type BurgerSlice = Omit<
  BurgerConstructorUIProps,
  'closeOrderModal' | 'onOrderClick'
>;

const burgerState: BurgerSlice = {
  constructorItems: { bun: null, ingredients: [] },
  orderRequest: false,
  orderModalData: null,
  price: 0
};

export const burgerconstructorSlice = createSlice({
  name: 'burgerconstructorReducer',
  initialState: burgerState,
  reducers: {
    addItem: {
      reducer: (
        state: BurgerSlice,
        action: PayloadAction<TConstructorIngredient>
      ) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
        return state;
      },
      prepare: (ingredient: TConstructorIngredient) => ({
        payload: { ...ingredient, uniqueId: v4() }
      })
    },
    removeItem: (state: BurgerSlice, action: PayloadAction<number>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (i) => i !== state.constructorItems.ingredients[action.payload]
        );
      return state;
    },
    moveUp: (state: BurgerSlice, action: PayloadAction<number>) => {
      const {
        constructorItems: { ingredients }
      } = state;
      if (ingredients.length - 1 < action.payload || action.payload < 0) return;

      if (action.payload === 0) {
        [ingredients[action.payload], ingredients[action.payload + 1]] = [
          ingredients[action.payload + 1],
          ingredients[action.payload]
        ];
      } else {
        [ingredients[action.payload - 1], ingredients[action.payload]] = [
          ingredients[action.payload],
          ingredients[action.payload - 1]
        ];
      }
      return state;
    },
    moveDown: (state: BurgerSlice, action: PayloadAction<number>) => {
      const {
        constructorItems: { ingredients }
      } = state;
      if (ingredients.length - 1 <= action.payload || action.payload < 0)
        return;
      const [elementToMoveUp, elementWhichBeReplaced] = [
        ingredients[action.payload],
        ingredients[action.payload + 1]
      ];
      [ingredients[action.payload], ingredients[action.payload + 1]] = [
        elementWhichBeReplaced,
        elementToMoveUp
      ];
      return state;
    },
    resetOrder: (state: BurgerSlice) => {
      state = burgerState;
      return state;
    }
  },
  selectors: {
    selectburgerState: (state: BurgerSlice) => state
  },
  extraReducers: (builder) => {
    builder.addCase(orderThunk.pending, (state) => {
      state.orderRequest = true;
      return state;
    });
    builder.addCase(orderThunk.rejected, (state) => {
      state.orderRequest = false;
      return state;
    });
    builder.addCase(orderThunk.fulfilled, (state, { payload }) => {
      state.orderModalData = payload.order;
      state.orderRequest = false;
      return state;
    });
  }
});

export const { addItem, removeItem, moveUp, moveDown, resetOrder } =
  burgerconstructorSlice.actions;

export const burgerConstructorReducer = burgerconstructorSlice.reducer;
export const { selectburgerState } = burgerconstructorSlice.selectors;
