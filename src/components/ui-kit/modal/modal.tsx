import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '..';
import { useModal } from 'hooks/useModal';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './modal.module.scss';
import { TMouseEvent } from 'types';
import { GVoid } from 'types';

type TModalProps = {
  status: boolean;
  children: React.ReactElement;
};

/* ####################
|||||||||||||||||||||||
##################### */
export const Modal: React.FC<TModalProps> = ({ status, children }) => {
  const { closeModal } = useModal();
  // запрещаем всплытие клика на основном модальном окне
  const notCloseModal: TMouseEvent = (e) => {
    e.stopPropagation();
  };

  const catchEsc: GVoid<KeyboardEvent> = (e) => {
    if (e!.key === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    if (status) document.addEventListener('keydown', catchEsc);

    return () => {
      document.removeEventListener('keydown', catchEsc);
    };
  }, [status]);

  return createPortal(
    <ModalOverlay status={status} onMouseDown={closeModal}>
      <div className={styles.block} onMouseDown={notCloseModal}>
        <button className={styles.close} onClick={closeModal}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    document.getElementById('modal') as Element,
  );
};
