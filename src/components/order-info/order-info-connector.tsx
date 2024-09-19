import { TIngredient, TOrder } from '@utils-types';
import React, { useMemo } from 'react';
import { OrderInfoUI } from '@ui';
import { useSelector } from '../../services/store';
import { selectConstructorState } from '../../features/constructorSlice/constructorSlice';

function calculateCount<T>(arr: Array<T>, val: T): number {
  return arr.reduce((a: number, v: T) => (v === val ? a + 1 : a), 0);
}

type TIngredientsWithCount = {
  [key: string]: TIngredient & { count: number };
};

export const OrderInfoConnector = ({
  order
}: {
  order: TOrder;
}): React.JSX.Element => {
  const { data: ingredients } = useSelector(selectConstructorState);

  const orderInfo = useMemo(() => {
    const orderUniqueIngredientIDs = Array.from(new Set(order.ingredients));
    let ingredientsArr: TIngredient[];
    let ingredientsInfo = orderUniqueIngredientIDs.reduce(
      (ingredientsInfo, orderIngredient) => {
        const ingredient = ingredients.find(
          (ingredient) => ingredient._id === orderIngredient
        );

        console.log(ingredient);
        if (!ingredient) {
          return ingredientsInfo;
        }

        return {
          ...ingredientsInfo,
          orderIngredient: {
            ...ingredient,
            count: calculateCount(order.ingredients, ingredient._id)
          }
        };
      },
      {} as TIngredientsWithCount
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...order,
      date: new Date(order?.createdAt),
      ingredientsInfo,
      total
    };
  }, [order, ingredients]);

  return <OrderInfoUI orderInfo={orderInfo} />;
};
