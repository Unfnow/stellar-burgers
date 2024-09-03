import { orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUIProps } from '../../src/components/ui/burger-constructor/type';

export const orderThunk = createAsyncThunk(
  'order/orderBurgerApi',
  orderBurgerApi
);

type BurgerSlice = Omit<
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
    addItem: (
      state: BurgerSlice,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push(action.payload);
      }
    },
    removeItem: (state: BurgerSlice, action: PayloadAction<number>) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (i) => i !== state.constructorItems.ingredients[action.payload]
        );
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

export const { selectburgerState } = burgerconstructorSlice.selectors;
