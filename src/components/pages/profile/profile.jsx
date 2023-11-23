import { useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { PATH } from '../../../utils/data';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadIngredients,
  loadOneOrder,
  logout,
  setFocus,
} from '../../../services/';
import { Loading } from '../../ui-kit';
import { useModal } from '../../../hooks/useModal';
/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './profile.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export function Profile() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { openModal } = useModal();
  const { id } = useParams();
  const { isModalOpen, loading } = useSelector((store) => store.modal);
  const { orders } = useSelector((store) => store['myFeed']);
  const background = location.state && location.state.background;
  const isOrdersPath = location.pathname.includes(`${PATH.ORDERS}/`);
  const oneOrderFlag = isOrdersPath && !background;

  const isActive = ({ isActive }) =>
    isActive ? styles.link + ' ' + styles.active : styles.link;

  const onLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!oneOrderFlag) {
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
