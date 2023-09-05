import React from 'react';
// import ReactDOM from 'react-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  MenuIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ButtonMenu from '../../ui-kit/button-menu/button-menu';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './app-header.module.scss';
import { AppHeaderPropTypes } from './app-header.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
function AppHeader({ className }) {
  return (
    <header className={className + ' ' + styles.header}>
      <a className={styles.logo} href="/">
        <Logo />
      </a>
      <nav className={styles.navigation}>
        <ul className={styles.list}>
          <li>
            <ButtonMenu active>
              <BurgerIcon type="primary" />
              Конструктор
            </ButtonMenu>
          </li>
          <li>
            <ButtonMenu>
              <ListIcon type="secondary" />
              Лента заказов
            </ButtonMenu>
          </li>
          <li>
            <ButtonMenu>
              <ProfileIcon type="secondary" />
              Личный кабинет
            </ButtonMenu>
            {/* <ArrowUpIcon type="primary" />
            <ArrowDownIcon type="primary" />
            <ul>
              <li>Профиль</li>
              <li>История заказов</li>
              <li>Выход</li>
            </ul> */}
          </li>
        </ul>

        <a className={styles.menu} href="/">
          <MenuIcon type="primary" />
        </a>
      </nav>
    </header>
  );
}
export default AppHeader;

/* #####################
ТИПЫ ===================
##################### */
AppHeader.propTypes = AppHeaderPropTypes;
