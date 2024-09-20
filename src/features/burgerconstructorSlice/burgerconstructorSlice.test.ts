import { TConstructorIngredient, TIngredient } from '@utils-types';
import { data } from '../fakedata';
import {
  addItem,
  burgerConstructorReducer,
  BurgerSlice,
  burgerState,
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

  test('addItem test', () => {
    const fakeAddItem = {
      type: addItem.type,
      payload: {
        ...fakeArray[0],
        id: '001'
      }
    };
    const lengthBefore = burgerState.constructorItems.ingredients.length;

    const reducer = burgerConstructorReducer(burgerState, fakeAddItem);
    const { constructorItems } = reducer;
    expect(constructorItems.ingredients[0]).toEqual(data[0]);
    expect(constructorItems.ingredients).toHaveLength(lengthBefore + 1);
  });

  test('removeItem test', () => {
    const lengthBefore = burgerState.constructorItems.ingredients.length;
    const removeReducer = burgerConstructorReducer(burgerState, removeItem(0));
    expect(removeReducer.constructorItems.ingredients).toHaveLength(
      lengthBefore
    );
  });

  test('moveItem test', () => {
    const beforeState = {
      constructorItems: { bun: null, ingredients: fakeArray },
      orderRequest: false,
      orderModalData: null,
      price: 0
    };
    let moveState = burgerConstructorReducer(burgerState, {
      type: addItem.type,
      payload: {
        ...fakeArray[0],
        id: '001'
      }
    });
    moveState = burgerConstructorReducer(moveState, {
      type: addItem.type,
      payload: {
        ...fakeArray[1],
        id: '002'
      }
    });
    console.log(moveState.constructorItems.ingredients);
    const beforeItem = moveState.constructorItems.ingredients;

    expect(moveState.constructorItems.ingredients).toHaveLength(
      beforeState.constructorItems.ingredients.length
    );
    let moveBurgerState = burgerConstructorReducer(moveState, moveUp(0));
    expect(moveBurgerState.constructorItems.ingredients[0]).toEqual(
      beforeItem[1]
    );
    moveBurgerState = burgerConstructorReducer(moveState, moveDown(1));
    expect(moveBurgerState.constructorItems.ingredients[0]).toEqual(
      beforeItem[0]
    );
  });
});
