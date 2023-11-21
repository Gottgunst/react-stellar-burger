import React from 'react';
import { useSelector } from 'react-redux';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderStatus } from '../../../utils/data';
import moment from 'moment';
import 'moment/locale/ru';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './order-details.module.scss';
import { Loading } from '../../ui-kit';

/* ####################
|||||||||||||||||||||||
##################### */

export function OrderDetails() {
  const order = useSelector((store) => store.feed.focus);
  const { loading } = useSelector((store) => store.feed);
  const ingredients = useSelector((store) => store.ingredients.itemsMap);
  const time = moment(order?.createdAt).locale('ru').calendar();

  console.log(order);

  return order === false || loading ? (
    <Loading />
  ) : (
    <div className={styles.wrapper}>
      <p className={styles.digit}>#{order?.number}</p>
      <h2 className={styles.title}>{order?.name}</h2>
      <span className={styles.status}>{orderStatus[order?.status]}</span>

      <h3 className={styles.title}>Состав:</h3>
      <ul className={styles.list}>
        {order?.ingredients?.map((id, index) => (
          <li
            className={styles.ingredient}
            key={ingredients[id]._id + 'list' + index}
          >
            <img
              className={styles.image}
              alt={ingredients[id].name}
              src={ingredients[id].image}
            />
            <div className={styles.name}>{ingredients[id].name}</div>
            <span className={styles.digit}>
              1 x {ingredients[id].price}
              <CurrencyIcon type="primary" />
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.bottom}>
        <span>{time}</span>
        <span className={styles.digit}>
          510
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
}
