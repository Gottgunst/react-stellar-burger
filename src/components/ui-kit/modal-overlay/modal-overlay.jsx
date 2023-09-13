// import React from 'react';
import { createPortal } from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './modal-overlay.module.scss';
import { ModalOverlayPropTypes } from './modal-overlay.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
function ModalOverlay({ status, onMouseDown, children }) {
  const modalClases = `${styles.bg} ${status ? styles['bg_opened'] : ''}`;

  return (
    <div className={modalClases} onMouseDown={onMouseDown}>
      {children}
    </div>
  );
}

export default ModalOverlay;

/* #####################
ТИПЫ ===================
##################### */
ModalOverlay.propTypes = ModalOverlayPropTypes;
