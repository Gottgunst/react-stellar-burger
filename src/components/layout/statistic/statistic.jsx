// import React from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './statistic.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export function Statistic() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.table}>
        <div>
          <h4 className={styles.title}>Готовы:</h4>
          <ul className={styles['orders-list']}>
            {[...new Array(10)].map((e, index) => (
              <li
                className={styles.orders + ' ' + styles['orders_done']}
                key={index}
              >
                034538
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={styles.title}>В работе:</h4>
          <ul className={styles['orders-list']}>
            {[...new Array(10)].map((e, index) => (
              <li className={styles.orders} key={index + 'e'}>
                034538
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>Выполнено за все время:</h4>
        <div className={styles.digit}>28 752</div>
      </div>
      <div className={styles.info}>
        <h4 className={styles.title}>Выполнено за сегодня:</h4>
        <div className={styles.digit}>138</div>
      </div>
    </div>
  );
}
