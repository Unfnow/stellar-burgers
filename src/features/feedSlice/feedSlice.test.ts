import { feedSliceReducer, feedState, feedThunk } from './feedSlice';

describe('feedSlice test', () => {
  test('extraReducers pending test', () => {
    const beforeState = {
      ...feedState,
      isLoaded: false
    };
    const afterState = feedSliceReducer(beforeState, {
      type: feedThunk.pending.type
    });
    expect(beforeState).toEqual(afterState);
  });
  test('extraReducers rejected test', () => {
    const beforeState = {
      ...feedState,
      isLoaded: false,
      error: 'rejected'
    };
    const afterState = feedSliceReducer(beforeState, {
      type: feedThunk.rejected.type,
      error: new Error('rejected')
    });

    expect(beforeState).toEqual(afterState);
  });
  test('extraReducers fulfilled test', () => {
    const beforeState = {
      ...feedState,
      isLoaded: true,
      totalToday: '1000',
      total: '100',
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
      type: feedThunk.fulfilled.type,
      payload: {
        totalToday: '1000',
        total: '100',
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
      }
    };
    const afterState = feedSliceReducer(feedState, action);
    expect(beforeState).toEqual(afterState);
  });
});
