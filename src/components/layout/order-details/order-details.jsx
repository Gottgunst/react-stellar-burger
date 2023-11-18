import React from 'react';
import { useSelector } from 'react-redux';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './order-details.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

/* ####################
|||||||||||||||||||||||
##################### */

export function OrderDetails() {
  const order = useSelector((store) => store.feed.focus);
  const allIngredients = useSelector((store) => store.ingredients.items);

  return (
    <div className={styles.wrapper}>
      <p className={styles.digit}>{order._id}</p>
      <h2 className={styles.title}>
        Black Hole Singularity острый бургер {order.name}
      </h2>
      <span className={styles.status}>Выполнен</span>

      <h3 className={styles.title}>Состав:</h3>
      <ul className={styles.list}>
        {allIngredients.map((e) =>
          order.ingredients.some((id) => id === e._id) ? (
            <li className={styles.ingredient} key={e._id}>
              <img className={styles.image} alt={e.name} src={e.image} />
              <div className={styles.name}>{e.name}</div>
              <span className={styles.digit}>
                1 x {e.price}
                <CurrencyIcon type="primary" />
              </span>
            </li>
          ) : null,
        )}
      </ul>

      <div className={styles.bottom}>
        <span>Вчера, 13:50 i-GMT+3</span>
        <span className={styles.digit}>
          510
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
}
