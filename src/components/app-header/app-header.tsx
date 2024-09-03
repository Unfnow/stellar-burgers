import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectName } from '../../features/userSlice';

export const AppHeader: FC = () => {
  const { pathname } = useLocation();
  const username = useSelector(selectName);

  return <AppHeaderUI pathname={pathname} userName={username} />;
};

export default AppHeader;
