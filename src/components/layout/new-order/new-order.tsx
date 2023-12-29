import React from 'react';
import { useSelector } from 'hooks/useRedux';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './new-order.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */

export const NewOrder: React.FC = () => {
  const order = useSelector((store) => store.order);

  return (
    <div className={styles.wrapper}>
      {order.loading ? (
        <>
          <h2 className={styles.title}>…</h2>
          <p className={styles.digit}>…</p>
          <p className={styles['digit-caption']}>
            {order.error ? order.error.message : 'заказ отправляется, вот-вот'}
          </p>
        </>
      ) : (
        <>
          <h2 className={styles.title}>'Заказ оформлен'</h2>
          <p className={styles.digit}>{order.orderId}</p>
          <p className={styles['digit-caption']}>идентификатор заказа</p>
          <div className={styles.icon}></div>
          <p className={styles.status}>Ваш заказ начали готовить:</p>
          <p className={styles.status}>{order.name}</p>
          <p className={styles['status-caption']}>
            Дождитесь готовности на орбитальной станции
          </p>
        </>
      )}
    </div>
  );
};
