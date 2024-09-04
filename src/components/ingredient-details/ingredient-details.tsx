import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import store, { useSelector } from '../../services/store';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { selectConstructorState } from '../../features/constructorSlice';

export const IngredientDetails: FC = () => {
  const { data } = useSelector(selectConstructorState);
  const pageId = useParams();
  const ingredientData = data.find((ingredient) => pageId.id == ingredient._id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
