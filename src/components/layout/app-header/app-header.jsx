import React from 'react';
// import ReactDOM from 'react-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  MenuIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { AppHeaderPropTypes } from './app-header.types.js';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { PATH } from '../../../utils/data';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './app-header.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export function AppHeader({ className }) {
  const location = useLocation();
  const key = location.pathname.slice(1);
  const isActive = ({ isActive }) =>
    isActive ? styles.link + ' ' + styles.active : styles.link;

  return (
    <header className={className + ' ' + styles.header}>
      <Link to="/" className={styles.logo}>
        <Logo />
      </Link>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li>
            <NavLink to="/" className={isActive}>
              <BurgerIcon type={key === '' ? 'primary' : 'secondary'} />
              Конструктор
            </NavLink>
          </li>
          <li>
            <NavLink to={'/' + PATH.FEED} className={isActive}>
              <ListIcon type={key === PATH.FEED ? 'primary' : 'secondary'} />
              Лента заказов
            </NavLink>
          </li>
          <li>
            <NavLink to={'/' + PATH.PROFILE} className={isActive}>
              <ProfileIcon
                type={key.includes(PATH.PROFILE) ? 'primary' : 'secondary'}
              />
              Личный кабинет
            </NavLink>
          </li>
        </ul>

        <a className={styles.menu} href="/">
          <MenuIcon type="primary" />
        </a>
      </nav>
    </header>
  );
}

/* #####################
ТИПЫ ===================
##################### */
AppHeader.propTypes = AppHeaderPropTypes;
