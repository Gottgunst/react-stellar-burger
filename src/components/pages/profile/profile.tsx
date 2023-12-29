import { useEffect } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { PATH } from 'utils/data';
import { useDispatch, useSelector } from 'hooks/useRedux';
import { loadIngredients, loadOneOrder, logout, setFocus } from 'services';
import { Loading } from '../../ui-kit';
import { useModal } from 'hooks/useModal';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './profile.module.scss';
import { TIsActive } from 'types';

/* ####################
|||||||||||||||||||||||
##################### */
export const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { openModal } = useModal();
  const { id } = useParams();
  const { isModalOpen, loading } = useSelector((store) => store.modal);
  const { orders } = useSelector((store) => store['myFeed']);
  const background = location.state && location.state.background;
  const isOrdersPath = location.pathname.includes(`${PATH.ORDERS}/`);
  const oneOrderFlag = isOrdersPath && !background;

  const isActive = ({ isActive }: TIsActive): string =>
    isActive ? styles.link + ' ' + styles.active : styles.link;

  const onLogout = (): void => {
    dispatch(logout());
  };

  useEffect(() => {
    if (!oneOrderFlag) {
      dispatch(loadIngredients());

      //если перезагрузили а модальник открыт
      if (!isModalOpen && background) {
        if (orders === null) dispatch(loadOneOrder(id as unknown as number));
        openModal();
        dispatch(setFocus(orders[id!]));
      }
    } else {
      // иначе грузим через API
      dispatch(loadOneOrder(id as unknown as number));
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
            <Link to="" className={styles.link} onClick={onLogout}>
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
};
