import React, { useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './ingredient-details.module.scss';
import { setFocus } from '../../../services';

/* ####################
|||||||||||||||||||||||
##################### */
export function IngredientDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { focus } = useSelector((store) => store.modal);
  const { itemsMap } = useSelector((store) => store.ingredients);

  useEffect(() => {
    dispatch(setFocus(itemsMap[id]));
  }, []);

  return (
    focus && (
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Детали ингредиента</h2>
        <img src={focus.image} alt={focus.name} className={styles.image} />
        <h3 className={styles.name}>{focus.name}</h3>
        <ul className={styles.consist}>
          <li>
            Калории,ккал
            <div className={styles.digits}>{focus.calories}</div>
          </li>
          <li>
            Белки, г<div className={styles.digits}>{focus.proteins}</div>
          </li>
          <li>
            Жиры, г<div className={styles.digits}>{focus.fat}</div>
          </li>
          <li>
            Углеводы, г
            <div className={styles.digits}>{focus.carbohydrates}</div>
          </li>
        </ul>
      </div>
    )
  );
}
