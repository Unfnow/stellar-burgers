import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  profileOrderThunk,
  selectOrders
} from '../../features/profileOrdersSlice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const { orders } = useSelector(selectOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    const promise = dispatch(profileOrderThunk());
    return () => {
      promise.abort();
    };
  }, []);
  return <ProfileOrdersUI orders={orders} />;
};
