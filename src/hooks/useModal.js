import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setFocus, setModal } from '../services';
import { useNavigate } from 'react-router-dom';

export const useModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = useCallback(() => {
    dispatch(setModal(true));
  }, []);

  const closeModal = useCallback(() => {
    dispatch(setModal(false));
    // c -1 не работает replace
    navigate('', { replace: true });
  }, []);

  return {
    openModal,
    closeModal,
  };
};
