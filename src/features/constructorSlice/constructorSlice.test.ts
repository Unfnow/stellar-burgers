import { ConstructorPageUIProps } from 'src/components/ui/pages/constructor-page/type';
import {
  constructor,
  constructorReducer,
  constructorThunk
} from './constructorSlice';
import { TIngredient } from '@utils-types';
import store from 'src/services/store';
import { error } from 'console';

describe('constructorSlice test', () => {
  const fakeArray: Array<TIngredient> = [
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
    }
  ];
  const initialfakeState: ConstructorPageUIProps = {
    isIngredientsLoading: true,
    data: []
  };

  test('constructor test', () => {
    const beforeState = {
      ...initialfakeState,
      isIngredientsLoading: true,
      data: []
    };
    const action = {
      type: constructor.type,
      data: []
    };
    const afterState = constructorReducer(initialfakeState, action);
    expect(beforeState).toEqual(afterState);
  });

  test('extraReducers pending test', () => {
    const beforeState = {
      ...initialfakeState,
      isIngredientsLoading: true
    };
    const afterState = constructorReducer(beforeState, {
      type: constructorThunk.pending.type
    });
    expect(beforeState).toEqual(afterState);
  });
  test('extraReducers rejected test', () => {
    const beforeState = {
      ...initialfakeState,
      isIngredientsLoading: true,
      error: 'rejected'
    };
    const afterState = constructorReducer(beforeState, {
      type: constructorThunk.rejected.type,
      error: new Error('rejected')
    });

    expect(beforeState).toEqual(afterState);
  });
  test('extraReducers fulfilled test', () => {
    const beforeState = {
      ...initialfakeState,
      isIngredientsLoading: false,
      data: fakeArray
    };
    const action = {
      type: constructorThunk.fulfilled.type,
      payload: fakeArray
    };
    const afterState = constructorReducer(initialfakeState, action);
    expect(beforeState).toEqual(afterState);
    expect(beforeState.data).toEqual(fakeArray);
  });
});
