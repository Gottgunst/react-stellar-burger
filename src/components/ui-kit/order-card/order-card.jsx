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
import { useLocation } from 'react-router-dom';
import { PATH, orderStatus } from '../../../utils/data';
import moment from 'moment';
import 'moment/locale/ru';

/* ####################
|||||||||||||||||||||||
##################### */
export function OrderCard({ order }) {
  const location = useLocation();
  const isProfilePage = location.pathname.includes(PATH.PROFILE);
  const ingredients = useSelector((store) => store.ingredients.itemsMap);
  const { loading } = useSelector((store) => store.ingredients);

  const cost = order?.ingredients.reduce((prev, id) => {
    return prev + ingredients[id]?.price;
  }, 0);

  const time = moment(order.createdAt).locale('ru').calendar();

  return loading ? null : (
    <div className={styles.wrapper}>
      <div className={styles.line}>
        <p className={styles.digit}>#{order.number}</p>
        <span>{time}</span>
      </div>
      <h3 className={styles.title}>
        {order.name}
        {isProfilePage && (
          <div className={styles.status}>{orderStatus[order?.status]}</div>
        )}
      </h3>
      <div className={styles.line}>
        <ul className={styles.list}>
          {[...order?.ingredients]?.reverse().map(
            (id, index) =>
              index < 6 && (
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
              ),
          )}
        </ul>

        <span className={styles.digit}>
          {cost}
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
