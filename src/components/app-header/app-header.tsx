import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useLocation } from 'react-router-dom';
import { selectName } from '../../features/userSlice/userSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { pathname } = useLocation();
  const username = useSelector(selectName);

  return <AppHeaderUI pathname={pathname} userName={username} />;
};

export default AppHeader;
