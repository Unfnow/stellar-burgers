import { Register } from '@pages';
import {
  authSession,
  authSessionReducer,
  AuthState,
  currentEmailData,
  currentNameData,
  loginReducer,
  loginState,
  loginThunk,
  registerReducer,
  registerSlice,
  registerState,
  registerThunk,
  resetAuthSession,
  setCurrentSession,
  setloginEmail,
  setloginPassword,
  setNameNEmail,
  setRegisterEmail,
  setRegisterPassword,
  setRegisterUserName,
  TAuthState,
  userThunk
} from './userSlice';
import { error } from 'console';

//registerSlice

describe('registerSlice test', () => {
  test('setRegisterEmail test', () => {
    const reducer = registerReducer(
      registerState,
      setRegisterEmail('fake@gmail.com')
    );
    expect(reducer.email).toEqual('fake@gmail.com');
  });
  test('setRegisterPassword test', () => {
    const reducer = registerReducer(
      registerState,
      setRegisterPassword('fakePassword123!')
    );
    expect(reducer.password).toEqual('fakePassword123!');
  });
  test('setRegisterUserName test', () => {
    const reducer = registerReducer(
      registerState,
      setRegisterUserName('fakeUserName')
    );
    expect(reducer.name).toEqual('fakeUserName');
  });
  test('extraReducers pending test', () => {
    const beforeState = {
      ...registerState,
      isSubmited: false
    };
    const afterState = registerReducer(beforeState, {
      type: registerThunk.pending.type
    });
    expect(beforeState).toEqual(afterState);
  });
  test('extraReducers rejected test', () => {
    const beforeState = {
      ...registerState,
      isSubmited: false,
      error: 'rejected'
    };
    const afterState = registerReducer(beforeState, {
      type: registerThunk.rejected.type
    });

    expect(beforeState).toEqual(afterState);
  });
  test('extraReducers fulfilled test', () => {
    const beforeState = {
      ...registerState,
      isSubmited: true
    };
    const afterState = registerReducer(beforeState, {
      type: registerThunk.fulfilled.type
    });

    expect(beforeState).toEqual(afterState);
  });
});

//loginSlice

describe('loginSlice test', () => {
  test('setloginEmail test', () => {
    const reducer = loginReducer(loginState, setloginEmail('fake2@gmail.com'));
    expect(reducer.email).toEqual('fake2@gmail.com');
  });
  test('setloginPassword', () => {
    const reducer = loginReducer(
      loginState,
      setloginPassword('fake2Password123!')
    );
    expect(reducer.password).toEqual('fake2Password123!');
  });
  test('extraReducers pending test', () => {
    const beforeState = {
      ...loginState,
      isSubmited: false
    };
    const afterState = loginReducer(beforeState, {
      type: loginThunk.pending.type
    });
    expect(beforeState).toEqual(afterState);
  });
  test('extraReducers rejected test', () => {
    const beforeState = {
      ...loginState,
      isSubmited: false,
      error: 'rejected'
    };
    const afterState = loginReducer(beforeState, {
      type: loginThunk.rejected.type
    });

    expect(beforeState).toEqual(afterState);
  });
  test('extraReducers fulfilled test', () => {
    const beforeState = {
      ...loginState,
      isSubmited: true
    };
    const afterState = loginReducer(beforeState, {
      type: loginThunk.fulfilled.type
    });

    expect(beforeState).toEqual(afterState);
  });
});

//authSession

describe('authSessionSlice test', () => {
  test('currentNameData test', () => {
    const reducer = authSessionReducer(
      AuthState,
      currentNameData('fakeUserName2')
    );
    expect(reducer.name).toEqual('fakeUserName2');
  });
  test('currentEmailData test', () => {
    const reducer = authSessionReducer(
      AuthState,
      currentEmailData('fake3@mail.ru')
    );
    expect(reducer.email).toEqual('fake3@mail.ru');
  });
  test('setCurrentSession test', () => {
    const AuthFakeState: TAuthState = {
      email: '',
      name: '',
      error: '',
      isLoading: false
    };
    const beforeState = {
      email: 'fake4@gmail.com',
      name: 'fakeName4',
      error: '',
      isLoading: false
    };
    const action = {
      type: setCurrentSession.type,
      payload: {
        user: {
          name: 'fakeName4',
          email: 'fake4@gmail.com'
        }
      },
      success: true,
      refreshToken: 'refreshFakeToken',
      accessToken: 'accessFaketoken',
      error: '',
      isLoading: false
    };
    const afterState = authSessionReducer(AuthFakeState, action);
    expect(beforeState).toEqual(afterState);
  });
  test('setNameNEmail', () => {
    const AuthFakeState: TAuthState = {
      email: '',
      name: '',
      error: '',
      isLoading: false
    };
    const beforeState = {
      name: 'fakeName4',
      email: 'fake4@gmail.com',
      error: '',
      isLoading: false
    };
    const action = {
      type: setNameNEmail.type,
      payload: {
        user: {
          name: 'fakeName4',
          email: 'fake4@gmail.com'
        }
      }
    };
    const afterState = authSessionReducer(AuthFakeState, action);
    expect(beforeState).toEqual(afterState);
  });
  test('resetAuthSession', () => {
    const AuthFakeState: TAuthState = {
      email: '',
      name: '',
      error: '',
      isLoading: false
    };
    const beforeState = {
      name: '',
      email: '',
      error: '',
      isLoading: false
    };
    const action = {
      type: resetAuthSession.type,
      payload: {
        user: {
          name: 'fakeName4',
          email: 'fake4@gmail.com'
        }
      }
    };
    const afterState = authSessionReducer(AuthFakeState, action);
    expect(beforeState).toEqual(afterState);
  });
  test('extraReducers pending test', () => {
    const beforeState = {
      ...AuthState,
      isLoading: true
    };
    const afterState = authSessionReducer(beforeState, {
      type: userThunk.pending.type
    });
    expect(beforeState).toEqual(afterState);
  });
  test('extraReducers rejected test', () => {
    const beforeState = {
      ...AuthState,
      isLoading: true,
      error: 'rejected'
    };
    const afterState = authSessionReducer(beforeState, {
      type: loginThunk.rejected.type
    });

    expect(beforeState).toEqual(afterState);
  });
  test('extraReducers fulfilled test', () => {
    const beforeState = {
      ...AuthState,
      isLoading: false
    };
    const afterState = authSessionReducer(beforeState, {
      type: loginThunk.fulfilled.type
    });

    expect(beforeState).toEqual(afterState);
  });
});
