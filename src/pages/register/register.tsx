import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import store, {
  AppDispatch,
  useDispatch,
  useSelector
} from '../../services/store';
import {
  registerThunk,
  selectAuthState,
  selectRegister,
  setCurrentSession,
  setRegisterEmail,
  setRegisterPassword,
  setRegisterUserName
} from '../../features/userSlice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const { email, name, password } = useSelector(selectRegister);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const setInputEmail = (e: string) => {
    dispatch(setRegisterEmail(e));
  };

  const setInputPassword = (e: string) => {
    dispatch(setRegisterPassword(e));
  };

  const setInputUserName = (e: string) => {
    dispatch(setRegisterUserName(e));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await dispatch(registerThunk({ email, password, name }));
    if (registerThunk.fulfilled.match(result)) {
      await dispatch(setCurrentSession(result.payload));
      navigate('/profile');
    }
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={name}
      password={password}
      setEmail={setInputEmail}
      setPassword={setInputPassword}
      setUserName={setInputUserName}
      handleSubmit={handleSubmit}
    />
  );
};
