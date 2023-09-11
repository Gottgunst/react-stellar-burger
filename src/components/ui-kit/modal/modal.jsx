import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './modal.module.scss';
import { ModalPropTypes } from './modal.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
function Modal({ openStatus, setOpenStatus, children }) {
  const closeModal = (e) => {
    setOpenStatus(false);
  };

  const catchEsc = (e) => {
    if (e.key === 'Escape') {
      closeModal(e);
    }
  };

  const dontCloseModal = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (openStatus) document.addEventListener('keydown', catchEsc);

    return () => {
      document.removeEventListener('keydown', catchEsc);
    };
  }, [openStatus]);

  // // Набор стилей для блока модального окна
  // let modalClases = `${styles.wrapper} ${
  //   closeStatus ? styles['wrapper_closed'] : ''
  // }`;

  return createPortal(
    <ModalOverlay status={openStatus} onMouseDown={closeModal}>
      <div className={styles.block} onMouseDown={dontCloseModal}>
        <button className={styles.close} onMouseDown={closeModal}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('modal'),
  );
}

export default Modal;

/* #####################
ТИПЫ ===================
##################### */
Modal.propTypes = ModalPropTypes;
