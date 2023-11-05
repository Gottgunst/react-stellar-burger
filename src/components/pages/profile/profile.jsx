import React from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, Outlet, useMatches } from 'react-router-dom';
import { PROFILE } from '../../..';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './profile.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export function Profile() {
  const isActive = ({ isActive }) =>
    isActive ? styles.link + ' ' + styles.active : styles.link;
  // const legend = useMatches();

  // console.log(legend);

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink end to={'/' + PROFILE} className={isActive}>
              Профиль
            </NavLink>
          </li>
          <li>
            <NavLink end to={'/' + PROFILE + '/orders'} className={isActive}>
              История заказов
            </NavLink>
          </li>
          <li>
            <NavLink end to={'/exit'} className={isActive}>
              Выход
            </NavLink>
          </li>
        </ul>
        <span className={styles.tip}>
          В этом разделе вы можете изменить&nbsp;свои персональные данные
        </span>
      </nav>
      <Outlet />
    </div>
  );
}
