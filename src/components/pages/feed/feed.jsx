import { useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  Outlet,
  useLoaderData,
  useLocation,
  useParams,
} from 'react-router-dom';
import { Loading } from '../../ui-kit';
import { OrderList, Statistic } from '../../layout';
import { loadIngredients, setFocus } from '../../../services';
import { PATH, POINT, WebsocketStatus } from '../../../utils/data';
import { feedConnect, loadOneOrder } from '../../../services';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './feed.module.scss';
import { useModal } from '../../../hooks/useModal';

/* ####################
|||||||||||||||||||||||
##################### */
export function Feed() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const { id } = useParams();
  const { loading } = useSelector((store) => store.ingredients);
  const { isModalOpen } = useSelector((store) => store.modal);
  const background = location.state && location.state.background;
  const oneOrderFlag =
    location.pathname.includes(`/${PATH.FEED}/`) && !background;

  useEffect(() => {
    // Инициализация данных из API
    dispatch(
      feedConnect(`${process.env.REACT_APP_WSS_URL}${POINT.ORDERS_ALL}`),
    );
    dispatch(loadIngredients());
    //очищаем фокус при перезагрузке страницы
    dispatch(setFocus(null));

    if (oneOrderFlag) dispatch(loadOneOrder(id));
    else if (!isModalOpen && background) {
      openModal();
      dispatch(loadOneOrder(id));
    }
  }, []);

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
