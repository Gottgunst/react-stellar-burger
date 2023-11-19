import { useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { PATH } from '../../../utils/data';
import { Loading } from '../../ui-kit';
import { OrderList, Statistic } from '../../layout';
import { loadIngredients } from '../../../services';
/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './feed.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export function Feed() {
  const location = useLocation();
  const { loading } = useSelector((store) => store.ingredients);
  // const loading = false;
  const order = useSelector((store) => store.order);
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  // const oneOrderFlag = location.pathname.includes(PATH.FEED) && !background;
  const oneOrderFlag = false;

  useEffect(() => {
    // Инициализация данных из API
    // dispatch(loadOrders());
    dispatch(loadIngredients());
    //очищаем фокус при перезагрузке страницы
    // dispatch(getOrderInfo(null));
  }, []);

  return loading ? (
    <Loading />
  ) : !oneOrderFlag ? (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        <h1 className={styles.title}>Лента заказов</h1>
        <OrderList />
      </div>
      <Statistic className={styles.stat} />
    </div>
  ) : (
    <div className={styles['focus-order-wrapper']}>
      <Outlet />
    </div>
  );
}
