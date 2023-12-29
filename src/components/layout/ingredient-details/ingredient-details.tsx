import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks/useRedux';
import { useLocation, useParams } from 'react-router-dom';
import { loadIngredients, setFocus } from 'services';
import { Loading } from 'components/ui-kit';
/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './ingredient-details.module.scss';
import { IIngredient } from 'types';

/* ####################
|||||||||||||||||||||||
##################### */
export const IngredientDetails: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { focus } = useSelector((store) => store.modal);
  const { itemsMap } = useSelector((store) => store.ingredients);
  const { isModalOpen } = useSelector((store) => store.modal);
  const background = location.state && location.state.background;

  const ingredient = focus as IIngredient;
  const itemsMapLength = itemsMap.length as unknown as number;

  useEffect(() => {
    if (!background && itemsMapLength === 0) {
      dispatch(loadIngredients());
    } else dispatch(setFocus(itemsMap[id!]));
  }, [isModalOpen, itemsMap, id]);

  return !ingredient ? (
    <Loading />
  ) : (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Детали ингредиента</h2>
      <img
        src={ingredient.image}
        alt={ingredient.name}
        className={styles.image}
      />
      <h3 className={styles.name}>{ingredient.name}</h3>
      <ul className={styles.consist}>
        <li>
          Калории,ккал
          <div className={styles.digits}>{ingredient.calories}</div>
        </li>
        <li>
          Белки, г<div className={styles.digits}>{ingredient.proteins}</div>
        </li>
        <li>
          Жиры, г<div className={styles.digits}>{ingredient.fat}</div>
        </li>
        <li>
          Углеводы, г
          <div className={styles.digits}>{ingredient.carbohydrates}</div>
        </li>
      </ul>
    </div>
  );
};
