import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import store, { useDispatch, useSelector } from '../../services/store';
import { feedThunk, selectFeed } from '../../features/feedSlice/feedSlice';

export const Feed: FC = () => {
  const { isLoaded, orders } = useSelector(selectFeed);
  const dispatch = useDispatch();
  useEffect(() => {
    const promise = dispatch(feedThunk());
    return () => {
      promise.abort();
    };
  }, []);
  if (!orders.length && !isLoaded) {
    return <Preloader />;
  }
  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => dispatch(feedThunk())}
      isLoaded
    />
  );
};
