import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './modal.module.scss';
import { ModalPropTypes } from './modal.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
export function Modal({ status, closeModal, children }) {
  // запрещаем всплытие клика на основном модальном окне
  const dontCloseModal = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const catchEsc = (e) => {
      if (e.key === 'Escape') {
        closeModal(e);
      }
    };

    if (status) document.addEventListener('keydown', catchEsc);

    return () => {
      document.removeEventListener('keydown', catchEsc);
    };
  }, [status]);

  return createPortal(
    <ModalOverlay status={status} onMouseDown={closeModal}>
      <div className={styles.block} onMouseDown={dontCloseModal}>
        <button className={styles.close} onClick={closeModal}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('modal'),
  );
}

/* #####################
ТИПЫ ===================
##################### */
Modal.propTypes = ModalPropTypes;
