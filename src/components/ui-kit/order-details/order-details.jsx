import { useSelector } from 'react-redux';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './order-details.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
function OrderDetails() {
  const order = useSelector((state) => state.order);
  return (
    <div className={styles.wrapper}>
      {order.success ? (
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
