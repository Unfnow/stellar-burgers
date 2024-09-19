import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import store, {
  AppDispatch,
  useDispatch,
  useSelector
} from '../../services/store';
import { BurgerConstructorUIProps } from '../ui/burger-constructor/type';
import {
  orderThunk,
  resetOrder,
  selectburgerState
} from '../../features/burgerconstructorSlice/burgerConstructorSlice';
import { selectAuthState } from '../../features/userSlice/userSlice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const { orderModalData, orderRequest, constructorItems } =
    useSelector(selectburgerState);
  const authState = useSelector(selectAuthState);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!authState.email && !authState.name) return navigate('/login');
    const result = [
      constructorItems.bun?._id,
      constructorItems.bun?._id,
      ...constructorItems.ingredients.map(({ _id }) => _id)
    ];
    await dispatch(orderThunk(result));
  };
  const closeOrderModal = async () => {
    await dispatch(resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
