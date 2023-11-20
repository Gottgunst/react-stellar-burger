// import React from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import { useSelector } from 'react-redux';
import styles from './statistic.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export function Statistic() {
  const { total, totalToday, orders } = useSelector((store) => store.feed);
  return (
    <div className={styles.wrapper}>
      <div className={styles.table}>
        <div>
          <h4 className={styles.title}>Готовы:</h4>
          <ul className={styles['orders-list']}>
            {orders.map(
              (order, index) =>
                index < 10 &&
                order.status === 'done' && (
                  <li
                    className={styles.orders + ' ' + styles['orders_done']}
                    key={order.number}
                  >
                    {order.number}
                  </li>
                ),
            )}
          </ul>
        </div>
        <div>
          <h4 className={styles.title}>В работе:</h4>
          <ul className={styles['orders-list']}>
            {orders.map(
              (order, index) =>
                index < 10 &&
                order.status !== 'done' && (
                  <li className={styles.orders} key={order.number}>
                    {order.number}
                  </li>
                ),
            )}
          </ul>
        </div>
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>Выполнено за все время:</h4>
        <div className={styles.digit}>{total}</div>
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>Выполнено за сегодня:</h4>
        <div className={styles.digit}>{totalToday}</div>
      </div>
    </div>
  );
}
