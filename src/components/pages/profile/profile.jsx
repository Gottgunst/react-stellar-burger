import { useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { PATH, POINT } from '../../../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrderInfo,
  loadIngredients,
  loadOneOrder,
  logout,
  myFeedConnect,
} from '../../../services/';
/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './profile.module.scss';
import { Loading } from '../../ui-kit';
import { useModal } from '../../../hooks/useModal';

/* ####################
|||||||||||||||||||||||
##################### */
export function Profile() {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  const location = useLocation();
  const { openModal } = useModal();
  const { isModalOpen } = useSelector((store) => store.modal);
  const { loading } = useSelector((store) => store.ingredients);
  const background = location.state && location.state.background;
  const oneOrderFlag =
    location.pathname.includes(`${PATH.ORDERS}/`) && !background;

  const endOfPath = location.pathname.split('/').pop();

  const isActive = ({ isActive }) =>
    isActive ? styles.link + ' ' + styles.active : styles.link;

  useEffect(() => {
    const token = localStorage.getItem('accessToken').split(' ').pop();

    // Инициализация данных из API
    dispatch(
      myFeedConnect(
        `${process.env.REACT_APP_WSS_URL}${POINT.ORDERS}?token=${token}`,
      ),
    );
    dispatch(loadIngredients());
    //очищаем фокус при перезагрузке страницы
    dispatch(getOrderInfo(null));

    if (oneOrderFlag) dispatch(loadOneOrder(endOfPath));
    else if (!isModalOpen && background) {
      openModal();
      dispatch(loadOneOrder(endOfPath));
    }
  }, []);

  return loading ? (
    <Loading />
  ) : !oneOrderFlag ? (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink end to={`/${PATH.PROFILE}`} className={isActive}>
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink end to={`/${PATH.PROFILE}/orders`} className={isActive}>
              История заказов
            </NavLink>
          </li>
          <li>
            <Link className={styles.link} onClick={onLogout}>
              Выход
            </Link>
          </li>
        </ul>
        <span className={styles.tip}>
          В этом разделе вы можете
          {location.pathname === `/${PATH.PROFILE}`
            ? ' изменить свои персональные данные'
            : ' просмотреть свою историю заказов'}
        </span>
      </nav>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  ) : (
    <div className={styles['focus-order-wrapper']}>
      <Outlet />
    </div>
  );
}
