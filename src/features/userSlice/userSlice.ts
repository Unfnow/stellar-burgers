import {
  getUserApi,
  loginUserApi,
  refreshToken,
  registerUserApi,
  TAuthResponse,
  TLoginData,
  TRegisterData,
  TUserResponse,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from '../../../src/utils/cookie';

export const registerThunk = createAsyncThunk(
  'register/registerUserApi',
  registerUserApi
);

export const loginThunk = createAsyncThunk('login/loginUserApi', loginUserApi);

export const userThunk = createAsyncThunk('user/getUserApi', getUserApi);

export const updateThunk = createAsyncThunk(
  'user/updateUserApi',
  updateUserApi
);

type TregisterState = TRegisterData & {
  error: string;
  isSubmited: boolean;
};

type TloginState = TLoginData & {
  error: string;
  isSubmited: boolean;
};

export type TAuthState = Omit<TregisterState, 'password' | 'isSubmited'> & {
  isLoading: boolean;
};
export const registerState: TregisterState = {
  email: '',
  name: '',
  password: '',
  error: '',
  isSubmited: false
};

export const loginState: TloginState = {
  email: '',
  password: '',
  error: '',
  isSubmited: false
};

export const AuthState: TAuthState = {
  email: '',
  name: '',
  error: '',
  isLoading: false
};

export const registerSlice = createSlice({
  name: 'register',
  initialState: registerState,
  reducers: {
    setRegisterEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setRegisterPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setRegisterUserName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerThunk.pending, (state) => {
      state.isSubmited = false;
    });
    builder.addCase(registerThunk.rejected, (state) => {
      state.isSubmited = false;
      state.error = 'rejected';
    });
    builder.addCase(registerThunk.fulfilled, (state) => {
      state.isSubmited = true;
    });
  },
  selectors: {
    selectRegister: (state: TregisterState) => state
  }
});

export const loginSlice = createSlice({
  name: 'login',
  initialState: loginState,
  reducers: {
    setloginEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setloginPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(registerThunk.pending, (state) => {
      state.isSubmited = false;
      state.error = '';
    });
    builder.addCase(registerThunk.rejected, (state) => {
      state.isSubmited = false;
      state.error = 'rejected';
    });
    builder.addCase(registerThunk.fulfilled, (state) => {
      state.isSubmited = true;
      state.error = '';
    });
  },
  selectors: {
    selectlogin: (state: TloginState) => state
  }
});

export const authSession = createSlice({
  name: 'auth',
  initialState: AuthState,
  reducers: {
    currentNameData: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    currentEmailData: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setCurrentSession: (state, { payload }: PayloadAction<TAuthResponse>) => {
      state = {
        ...state,
        name: payload.user.name,
        email: payload.user.email
      };
      return state;
    },
    setNameNEmail: (state, { payload }: PayloadAction<TUserResponse>) => {
      state.email = payload.user.email;
      state.name = payload.user.name;
    },
    resetAuthSession: (state) => {
      state.email = '';
      state.name = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userThunk.pending, (state) => {
      state.isLoading = true;
      state.error = '';
    });
    builder.addCase(userThunk.rejected, (state) => {
      state.isLoading = false;
      state.error = 'rejected';
    });
    builder.addCase(userThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.email = action.payload.user.email;
      state.name = action.payload.user.name;
      return state;
    });
  },
  selectors: {
    selectName: (state: TAuthState) => state.name,
    selectEmail: (state: TAuthState) => state.email,
    selectAuthState: (state: TAuthState) => state
  }
});

export const { setRegisterEmail, setRegisterUserName, setRegisterPassword } =
  registerSlice.actions;

export const { setloginEmail, setloginPassword } = loginSlice.actions;

export const { selectRegister } = registerSlice.selectors;

export const { selectlogin } = loginSlice.selectors;

export const {
  currentEmailData,
  currentNameData,
  setCurrentSession,
  setNameNEmail,
  resetAuthSession
} = authSession.actions;

export const { selectEmail, selectName, selectAuthState } =
  authSession.selectors;

export const registerReducer = registerSlice.reducer;

export const loginReducer = loginSlice.reducer;

export const authSessionReducer = authSession.reducer;
