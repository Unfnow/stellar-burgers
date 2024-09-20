import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  numberedSlice,
  numberedThunk
} from '../../features/numberedOrderSlice/numberedOrderSlice';
import { useParams } from 'react-router-dom';
import { feedSlice } from '../../features/feedSlice/feedSlice';
import { profieOrderSlice } from '../../features/profileOrdersSlice/profileOrdersSlice';
import { OrderInfoConnector } from './order-info-connector';

export const OrderInfo: FC = () => {
  const { number } = useParams();
  const dispatch = useDispatch();

  const order = useSelector((state) => {
    let order = state[feedSlice.reducerPath].orders.find(
      (o) => o.number === +number!
    );
    if (order) {
      return order;
    }

    order = state[profieOrderSlice.reducerPath].orders.find(
      (o) => o.number === +number!
    );
    if (order) {
      return order;
    }

    return state[numberedSlice.reducerPath].order;
  });

  useEffect(() => {
    if (!order) {
      dispatch(numberedThunk(+number!));
    }
  }, []);

  if (!order) {
    return <Preloader />;
  }

  return <OrderInfoConnector order={order} />;
};
