// import React from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import { AppHeader } from '../../layout';
import styles from './error.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export function Error() {
  return (
    <div className={styles.app}>
      <AppHeader className={styles.header} />

      <h1>404</h1>
    </div>
  );
}
