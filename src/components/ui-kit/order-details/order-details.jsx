import React, { useContext } from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { OrderContext } from '../../../utils/context';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './order-details.module.scss';
// import { OrderDetailsPropTypes } from './order-details.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
function OrderDetails() {
  const [orderState] = useContext(OrderContext);

  return (
    <div className={styles.wrapper}>
      {orderState.success ? (
        <>
          <h2 className={styles.title}>'Заказ оформлен'</h2>
          <p className={styles.digit}>{orderState.id}</p>
          <p className={styles['digit-caption']}>идентификатор заказа</p>
          <div className={styles.icon}></div>
          <p className={styles.status}>Ваш заказ начали готовить:</p>
          <p className={styles.status}>{orderState.name}</p>
          <p className={styles['status-caption']}>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      ) : (
        <>
          <h2 className={styles.title}>…</h2>
          <p className={styles.digit}>…</p>
          <p className={styles['digit-caption']}>заказ отправляется, вот-вот</p>
        </>
      )}
    </div>
  );
}

export default OrderDetails;

/* #####################
ТИПЫ ===================
##################### */
// OrderDetails.propTypes = OrderDetailsPropTypes;
