import {
  numberedReducer,
  numberedState,
  numberedThunk
} from './numberedOrderSlice';

describe('profieOrderSlice test', () => {
  test('extraReducers pending test', () => {
    const beforeState = {
      ...numberedState,
      isLoaded: false
    };
    const afterState = numberedReducer(beforeState, {
      type: numberedThunk.pending.type
    });
    expect(beforeState).toEqual(afterState);
  });

  test('extraReducers rejected test', () => {
    const beforeState = {
      ...numberedState,
      isLoaded: false,
      error: 'rejected'
    };
    const afterState = numberedReducer(beforeState, {
      type: numberedThunk.rejected.type,
      error: new Error('rejected'),
      isLoaded: false
    });
    expect(beforeState).toEqual(afterState);
  });

  test('extraReducers fulfilled test', () => {
    const beforeState = {
      ...numberedState,
      isLoaded: true,
      order: {
        _id: '000',
        status: 'ready',
        name: 'burger1',
        createdAt: '00:00',
        updatedAt: '00:01',
        number: 1,
        ingredients: ['bun1', 'main1']
      }
    };
    const action = {
      type: numberedThunk.fulfilled.type,
      payload: {
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
          },
          {
            _id: '002',
            status: 'ready',
            name: 'burger3',
            createdAt: '00:04',
            updatedAt: '00:05',
            number: 3,
            ingredients: ['bun3', 'main3']
          }
        ]
      }
    };
    const afterState = numberedReducer(numberedState, action);
    expect(beforeState.order).toEqual(afterState.order);
  });
});
