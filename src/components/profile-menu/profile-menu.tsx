import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { deleteCookie } from '../../utils/cookie';
import { AppDispatch, useDispatch } from '../../services/store';
import { resetAuthSession } from '../../features/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    deleteCookie('accessToken');
    localStorage.removeItem('refreshToken');
    await dispatch(resetAuthSession());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
