import React from 'react';
import { useSelector } from 'react-redux';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './order-card.module.scss';
import { OrderCardPropTypes } from './order-card.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
export function OrderCard({ order }) {
  const ingredients = useSelector((store) => store.ingredients.itemsMap);
  const { loading } = useSelector((store) => store.ingredients);

  return loading ? null : (
    <div className={styles.wrapper}>
      <div className={styles.line}>
        <p className={styles.digit}>{order._id}</p>
        <span>Вчера, 13:50 i-GMT+3</span>
      </div>
      <h3 className={styles.title}>{order.name}</h3>
      <div className={styles.line}>
        <ul className={styles.list}>
          {order.ingredients.map((id, index) =>
            index < 6 ? (
              <li
                className={styles.ingredient}
                key={index}
                style={{ zIndex: 6 - index }}
              >
                {index === 5 && order.ingredients.length > 5 ? (
                  <div className={styles.shadow}>
                    +{order.ingredients.length - 5}
                  </div>
                ) : null}

                <img
                  className={styles.image}
                  alt={ingredients[id]?.name}
                  src={ingredients[id]?.image}
                />
              </li>
            ) : null,
          )}
        </ul>

        <span className={styles.digit}>
          510
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
}

/* #####################
ТИПЫ ===================
##################### */
OrderCard.propTypes = OrderCardPropTypes;
