import React from 'react';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './modal-overlay.module.scss';
import { TMouseEvent } from 'types';

type TModalOverlayProps = {
  status: boolean;
  onMouseDown: TMouseEvent;
  children: React.ReactElement;
};

/* ####################
|||||||||||||||||||||||
##################### */
export const ModalOverlay: React.FC<TModalOverlayProps> = ({
  status,
  onMouseDown,
  children,
}) => {
  const modalClass = `${styles.bg} ${status ? styles['bg_opened'] : ''}`;

  return (
    <div className={modalClass} onMouseDown={onMouseDown}>
      {children}
    </div>
  );
};
