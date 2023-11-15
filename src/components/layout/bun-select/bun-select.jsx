import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
// import ReactDOM from 'react-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './bun-select.module.scss';
import { BunSelectPropTypes } from './bun-select.types.js';
import { addToOrder } from '../../../services';

/* ####################
|||||||||||||||||||||||
##################### */
export function BunSelect({ className }) {
  const ingredients = useSelector((store) => store.ingredients);
  const bunVars = ingredients.items.filter((el) => el.type === 'bun');

  const dispatch = useDispatch();

  return (
    <div className={className + ' ' + styles.wrapper}>
      <h2 className={styles.title}>Выберите булочку:</h2>
      <ul className={styles.buns}>
        {bunVars.map((bun) => (
          <li
            key={bun._id}
            onClick={() => {
              dispatch(addToOrder({ item: bun }));
            }}
            className={styles.bun}
          >
            <img src={bun.image} alt={bun.name} className={styles.image} />
            <p className={styles.name}>{bun.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* #####################
ТИПЫ ===================
##################### */
BunSelect.propTypes = BunSelectPropTypes;
