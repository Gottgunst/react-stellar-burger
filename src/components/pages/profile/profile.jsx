import React from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { PATH } from '../../../utils/data';
import { useDispatch } from 'react-redux';
import { logout } from '../../../services/';
/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './profile.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export function Profile() {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  const location = useLocation();

  const isActive = ({ isActive }) =>
    isActive ? styles.link + ' ' + styles.active : styles.link;

  return (
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
      <Outlet />
    </div>
  );
}
