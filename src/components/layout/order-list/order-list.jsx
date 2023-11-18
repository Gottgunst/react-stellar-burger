import { useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderInfo, loadIngredients } from '../../../services';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import { OrderDetails } from '../order-details/order-details';
import styles from './order-list.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export function OrderList() {
  const dispatch = useDispatch();
  useEffect(() => {
    // Инициализация данных из API
    dispatch(loadIngredients());
    //очищаем фокус при перезагрузке страницы
    // dispatch(getOrderInfo(null));
  }, []);

  return (
    <div className={styles.wrapper}>
      <OrderDetails />
    </div>
  );
}
