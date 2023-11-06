import React from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './button-menu.module.scss';
import { ButtonMenuPropTypes } from './button-menu.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
export function ButtonMenu({ active = false, children }) {
  //  const  type = 'primary';
  const styleList = active
    ? styles['item'] + ' ' + styles['item_active']
    : styles['item'];

  return (
    <a href="/#" className={styleList}>
      {children}
    </a>
  );
}

/* #####################
ТИПЫ ===================
##################### */
ButtonMenu.propTypes = ButtonMenuPropTypes;
