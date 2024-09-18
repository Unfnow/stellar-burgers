import { TConstructorIngredient, TIngredient } from '@utils-types';
import { data } from '../fakedata';
import {
  addItem,
  burgerConstructorReducer,
  BurgerSlice,
  moveDown,
  moveUp,
  removeItem
} from './burgerConstructorSlice';

describe('BurgerConstructorSlice test', () => {
  const expectedResult = data;
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
    },
    {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa093c',
      calories: 420,
      carbohydrates: 53,
      fat: 24,
      name: 'Краторная булка N-200i',
      price: 1255,
      proteins: 80,
      type: 'bun',
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    }
  ];
  globalThis.fetch = jest.fn(() => {
    Promise.resolve({
      json: () => Promise.resolve(expectedResult)
    });
  }) as jest.Mock;

  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(expectedResult)
    } as unknown as Response);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const burgerFakeState: BurgerSlice = {
    constructorItems: { bun: null, ingredients: expectedResult },
    orderRequest: false,
    orderModalData: null,
    price: 0
  };

  test('addItem test', () => {
    const fakeAddItem = {
      type: addItem.type,
      payload: {
        ...fakeArray[0],
        id: '001'
      }
    };
    const lengthBefore = burgerFakeState.constructorItems.ingredients.length;

    const reducer = burgerConstructorReducer(burgerFakeState, fakeAddItem);
    const { constructorItems } = reducer;
    expect(constructorItems.ingredients[0]).toEqual(data[0]);
    expect(constructorItems.ingredients).toHaveLength(lengthBefore + 1);
  });

  test('removeItem test', () => {
    const fakeAddItem = {
      type: addItem.type,
      payload: {
        ...fakeArray[0],
        id: '001'
      }
    };
    const lengthBefore = burgerFakeState.constructorItems.ingredients.length;
    const removeReducer = burgerConstructorReducer(
      burgerFakeState,
      removeItem(0)
    );
    expect(removeReducer.constructorItems.ingredients).toHaveLength(
      lengthBefore - 1
    );
  });

  test('moveItem test', () => {
    const fakeAddItem = {
      type: addItem.type,
      payload: {
        ...fakeArray[1],
        id: '002'
      }
    };

    let moveBurgerState = burgerConstructorReducer(
      burgerFakeState,
      fakeAddItem
    );
    const beforeItem = moveBurgerState.constructorItems.ingredients;
    expect(moveBurgerState.constructorItems.ingredients).toHaveLength(2);
    moveBurgerState = burgerConstructorReducer(moveBurgerState, moveUp(0));
    expect(moveBurgerState.constructorItems.ingredients[0]).toEqual(
      beforeItem[1]
    );
    moveBurgerState = burgerConstructorReducer(burgerFakeState, moveDown(1));
    expect(moveBurgerState.constructorItems.ingredients[0]).toEqual(
      beforeItem[0]
    );
  });
});
