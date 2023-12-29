import { useCallback } from 'react';
import { useDispatch } from 'hooks/useRedux';
import { setModal } from 'services';
import { useNavigate } from 'react-router-dom';

/* ####################
====== ТИПИЗАЦИЯ ======
##################### */
type RUseModal = {
  openModal: () => void;
  closeModal: () => void;
};

/* ####################
|||||||||||||||||||||||
##################### */
export const useModal = (): RUseModal => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = useCallback((): void => {
    dispatch(setModal(true));
  }, []);

  const closeModal = useCallback((): void => {
    dispatch(setModal(false));
    // c -1 не работает replace
    navigate('', { replace: true });
  }, []);

  return {
    openModal,
    closeModal,
  };
};
