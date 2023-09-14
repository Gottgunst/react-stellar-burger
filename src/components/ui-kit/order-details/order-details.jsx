// import React from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './order-details.module.scss';
// import { OrderDetailsPropTypes } from './order-details.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
function OrderDetails() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Заказ оформлен</h2>
      <p className={styles.digit}>034536</p>
      <p className={styles['digit-caption']}>идентификатор заказа</p>
      <div className={styles.icon}></div>
      <p className={styles.status}>Ваш заказ начали готовить</p>
      <p className={styles['status-caption']}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;

/* #####################
ТИПЫ ===================
##################### */
// OrderDetails.propTypes = OrderDetailsPropTypes;
