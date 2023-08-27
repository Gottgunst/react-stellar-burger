import React from 'react';
import ReactDOM from 'react-dom';

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
} from '@ya.praktikum/react-developer-burger-ui-components';

/* ####################
КЛАСС =================
##################### */

class AppHeader extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {};
  // }

  // componentDidMount() {}
  // componentDidUpdate(prevProps, prevState){}
  // shouldComponentUpdate(nextProps, nextState){return false;}
  // componentWillUnmount() {}

  render() {
    return (
      <nav className={styles.header}>
        <ul className={styles.list}>
          <li className={styles.list_item}>
            <BurgerIcon type="primary" />
            Конструктор
          </li>
          <li className={styles.list_item}>
            <ListIcon type="primary" />
            Лента заказов
          </li>
          <li className={styles.list_item}>
            <ProfileIcon type="primary" />
            Личный кабинет
          </li>
        </ul>
        <div className={styles.logo}>
          <Logo />
        </div>
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
