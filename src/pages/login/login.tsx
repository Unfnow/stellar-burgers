import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import store, {
  AppDispatch,
  useDispatch,
  useSelector
} from '../../services/store';
import {
  loginThunk,
  selectlogin,
  setCurrentSession,
  setloginEmail,
  setloginPassword
} from '../../features/userSlice';

export const Login: FC = () => {
  const { email, password } = useSelector(selectlogin);

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const setInputEmail = (e: string) => {
    dispatch(setloginEmail(e));
  };

  const setInputPassword = (e: string) => {
    dispatch(setloginPassword(e));
  };

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await dispatch(loginThunk({ email, password }));
    if (loginThunk.fulfilled.match(result)) {
      await dispatch(setCurrentSession(result.payload));
      navigate('/profile');
    }
  };

  return (
    <LoginUI
      errorText=''
      email={email}
      setEmail={setInputEmail}
      password={password}
      setPassword={setInputPassword}
      handleSubmit={handleSubmit}
    />
  );
};
