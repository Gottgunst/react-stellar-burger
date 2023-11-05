import React from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './ingredient-details.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
function IngredientDetails() {
  const { focus } = useSelector((store) => store.ingredients);

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

export default IngredientDetails;
