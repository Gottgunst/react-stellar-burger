// import React from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './ingredient-details.module.scss';
import { IngredientDetailsPropTypes } from './ingredient-details.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
function IngredientDetails({ consist }) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Детали ингредиента</h2>
      <img src={consist.image} alt={consist.name} className={styles.image} />
      <h3 className={styles.name}>{consist.name}</h3>
      <ul className={styles.consist}>
        <li>
          Калории,ккал
          <div className={styles.digits}>{consist.calories}</div>
        </li>
        <li>
          Белки, г<div className={styles.digits}>{consist.proteins}</div>
        </li>
        <li>
          Жиры, г<div className={styles.digits}>{consist.fat}</div>
        </li>
        <li>
          Углеводы, г
          <div className={styles.digits}>{consist.carbohydrates}</div>
        </li>
      </ul>
    </div>
  );
}

export default IngredientDetails;

/* #####################
ТИПЫ ===================
##################### */
IngredientDetails.propTypes = IngredientDetailsPropTypes;
