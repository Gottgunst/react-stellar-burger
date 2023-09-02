import React from 'react';
// import ReactDOM from 'react-dom';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */

import styles from './app-header.module.scss';
import { AppHeaderPropTypes } from './app-header.types.js';
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
КЛАСС =================
##################### */

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.className = props.className;
    // this.state = {};
  }

  // componentDidMount() {}
  // componentDidUpdate(prevProps, prevState){}
  // shouldComponentUpdate(nextProps, nextState){return false;}
  // componentWillUnmount() {}

  render() {
    return (
      <nav className={this.className + ' ' + styles.header}>
        <a className={styles.logo} href="/">
          <Logo />
        </a>
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
    );
  }
}
export default AppHeader;

/* #####################
ТИПЫ и ПРОПСЫ ПО УМОЛЧАНИЮ 
##################### */
AppHeader.propTypes = AppHeaderPropTypes;
AppHeader.defaultProps = {};
