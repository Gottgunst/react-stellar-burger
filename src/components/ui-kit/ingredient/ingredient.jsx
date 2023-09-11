import React, { useState } from 'react';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './ingredient.module.scss';
import { IngredientPropTypes } from './ingredient.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
function Ingredient({ data, quantity = 0 }) {
  const [openStatus, setOpenStatus] = useState(false);

  const openModal = () => {
    setOpenStatus(true);
  };

  return (
    <>
      <div className={styles.wrapper} onClick={openModal}>
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
      <Modal openStatus={openStatus} setOpenStatus={setOpenStatus}>
        <div>{data.name}</div>
      </Modal>
    </>
  );
}

export default Ingredient;

/* #####################
ТИПЫ ===================
##################### */
Ingredient.propTypes = IngredientPropTypes;
