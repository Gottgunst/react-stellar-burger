import { useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Loading } from '../../ui-kit';
import { OrderList, Statistic } from '../../layout';
import { loadIngredients, setFocus } from '../../../services';
import { PATH, POINT, WebsocketStatus } from '../../../utils/data';
import { feedConnect, loadOneOrder, isItemsMap } from '../../../services';
import { useModal } from '../../../hooks/useModal';
/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './feed.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export function Feed() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { id } = useParams();
  const { tokenData } = useSelector((store) => store.user);
  const { status } = useSelector((store) => store.feed);
  const { isModalOpen, loading } = useSelector((store) => store.modal);
  const { orders } = useSelector((store) => store['feed']);
  const background = location.state && location.state.background;
  const oneOrderFlag =
    location.pathname.includes(`/${PATH.FEED}/`) && !background;

  useEffect(() => {
    if (!oneOrderFlag) {
      // Инициализация данных из WSS

      if (status === WebsocketStatus.OFFLINE) {
        dispatch(
          feedConnect(`${process.env.REACT_APP_WSS_URL}${POINT.ORDERS_ALL}`),
        );
      }
      dispatch(loadIngredients());

      //если перезагрузили а модальник открыт
      if (!isModalOpen && background) {
        if (orders === null) dispatch(loadOneOrder(id));
        openModal();
        dispatch(setFocus(orders[id]));
      }
    } else {
      // иначе грузим через API
      dispatch(loadOneOrder(id));
    }
  }, [tokenData]);

  return loading ? (
    <Loading />
  ) : !oneOrderFlag ? (
    <div className={styles.wrapper}>
      <div className={styles.list}>
        <h1 className={styles.title}>Лента заказов</h1>
        <OrderList type="feed" />
      </div>
      <Statistic className={styles.stat} />
    </div>
  ) : (
    <div className={styles['focus-order-wrapper']}>
      <Outlet />
    </div>
  );
}
