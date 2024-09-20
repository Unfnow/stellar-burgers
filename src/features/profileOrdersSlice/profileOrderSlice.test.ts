import {
  initialOrderState,
  orderReducer,
  profileOrderThunk
} from './profileOrdersSlice';

describe('profieOrderSlice test', () => {
  test('extraReducers pending test', () => {
    const beforeState = {
      ...initialOrderState,
      isLoaded: false
    };
    const afterState = orderReducer(beforeState, {
      type: profileOrderThunk.pending.type
    });
    expect(beforeState).toEqual(afterState);
  });

  test('extraReducers rejected test', () => {
    const beforeState = {
      ...initialOrderState,
      isLoaded: false,
      error: 'rejected'
    };
    const afterState = orderReducer(beforeState, {
      type: profileOrderThunk.rejected.type,
      error: new Error('rejected')
    });
    expect(beforeState).toEqual(afterState);
  });

  test('extraReducers fulfilled test', () => {
    const beforeState = {
      ...initialOrderState,
      isLoaded: true,
      orders: [
        {
          _id: '000',
          status: 'ready',
          name: 'burger1',
          createdAt: '00:00',
          updatedAt: '00:01',
          number: 1,
          ingredients: ['bun1', 'main1']
        },
        {
          _id: '001',
          status: 'notReady',
          name: 'burger2',
          createdAt: '00:02',
          updatedAt: '00:03',
          number: 2,
          ingredients: ['bun2', 'main2']
        }
      ]
    };
    const action = {
      type: profileOrderThunk.fulfilled.type,
      payload: [
        {
          _id: '000',
          status: 'ready',
          name: 'burger1',
          createdAt: '00:00',
          updatedAt: '00:01',
          number: 1,
          ingredients: ['bun1', 'main1']
        },
        {
          _id: '001',
          status: 'notReady',
          name: 'burger2',
          createdAt: '00:02',
          updatedAt: '00:03',
          number: 2,
          ingredients: ['bun2', 'main2']
        }
      ]
    };
    const afterState = orderReducer(initialOrderState, action);
    expect(beforeState).toEqual(afterState);
  });
});
