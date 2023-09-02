// import React from 'react';
// import ReactDOM from 'react-dom';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */

import styles from './ingredient.module.scss';
import { IngredientPropTypes } from './ingredient.types.js';

/* ####################
ФУНКЦИЯ================
##################### */

function Ingredient({ data, quantity = 0 }) {
  return (
    <div className={styles.wrapper}>
      {quantity === 0 ? null : (
        <Counter count={quantity} size="default" extraClass="m-1" />
      )}

      <img src={data.image} alt={data.name} className={styles.image} />
      <span className={styles.price}>
        {data.price}
        <CurrencyIcon type="primary" />
      </span>
      <p className={styles.name}>{data.name}</p>
    </div>
  );
}

export default Ingredient;

/* #####################
ТИПЫ ===================
##################### */
Ingredient.propTypes = IngredientPropTypes;