import React, { useState } from 'react';
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
|||||||||||||||||||||||
##################### */
function Ingredient({ data }) {
  const [_, setOpenStatus] = useState(false);

  const openModal = () => {
    setOpenStatus(true);
  };

  return (
    <>
      <div className={styles.wrapper} onClick={openModal}>
        {data.quantity > 0 && (
          <Counter count={data.quantity} size="default" extraClass="m-1" />
        )}

        <img src={data.image} alt={data.name} className={styles.image} />
        <span className={styles.price}>
          {data.price}
          <CurrencyIcon type="primary" />
        </span>
        <p className={styles.name}>{data.name}</p>
      </div>
    </>
  );
}

export default Ingredient;

/* #####################
ТИПЫ ===================
##################### */
Ingredient.propTypes = IngredientPropTypes;
