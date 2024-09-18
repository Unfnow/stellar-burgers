import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { constructorSlice } from '../../src/features/constructorSlice';
import { feedSlice } from '../features/feedSlice';
import { burgerconstructorSlice } from '../features/burgerConstructorSlice';
import {
  authSession,
  loginSlice,
  registerSlice
} from '../../src/features/userSlice';
import { profieOrderSlice } from '../../src/features/profileOrdersSlice';
import { numberedSlice } from '../../src/features/numberedOrderSlice';
export const rootReducer = combineSlices(
  constructorSlice,
  feedSlice,
  burgerconstructorSlice,
  registerSlice,
  loginSlice,
  authSession,
  profieOrderSlice,
  numberedSlice
);

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
