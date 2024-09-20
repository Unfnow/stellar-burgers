import { combineSlices } from '@reduxjs/toolkit';
import store, { rootReducer } from './store';
import { constructorSlice } from '../../src/features/constructorSlice/constructorSlice';
import { feedSlice } from '../../src/features/feedSlice/feedSlice';
import { burgerconstructorSlice } from '../../src/features/burgerconstructorSlice/burgerConstructorSlice';
import {
  authSession,
  loginSlice,
  registerSlice
} from '../../src/features/userSlice/userSlice';
import { profieOrderSlice } from '../../src/features/profileOrdersSlice/profileOrdersSlice';
import { numberedSlice } from '../../src/features/numberedOrderSlice/numberedOrderSlice';
describe('Store test', () => {
  beforeEach(() => {});

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('rootReducer test', () => {
    const beforeState = store.getState();
    let afterState = {
      auth: { email: '', error: '', isLoading: false, name: '' },
      login: { email: '', password: '', error: '', isSubmited: false },
      register: {
        email: '',
        name: '',
        password: '',
        error: '',
        isSubmited: false
      },
      burgerconstructorReducer: {
        constructorItems: { bun: null, ingredients: [] },
        orderRequest: false,
        orderModalData: null,
        price: 0
      },
      constructorReducer: { isIngredientsLoading: true, data: [] },
      feedReducer: { orders: [], isLoaded: false, total: 0, totalToday: 0 },
      profieOrderReducer: {
        orders: [],
        isLoaded: false,
        total: 0,
        totalToday: 0
      },
      numberedReducer: { isLoaded: false, order: null }
    };
    expect(afterState).toEqual(beforeState);
  });
});
