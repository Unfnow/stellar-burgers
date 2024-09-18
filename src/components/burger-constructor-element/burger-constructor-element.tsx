import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { AppDispatch, useDispatch } from '../../services/store';
import {
  moveDown,
  moveUp,
  removeItem
} from '../../features/burgerConstructorSlice';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch: AppDispatch = useDispatch();
    const handleMoveDown = () => {
      dispatch(moveDown(index));
    };

    const handleMoveUp = () => {
      dispatch(moveUp(index));
    };

    const handleClose = () => {
      dispatch(removeItem(index));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
