import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../services';
import { useNavigate } from 'react-router-dom';

export const useModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const openModal = useCallback(() => {
    dispatch(setModal(true));
  }, []);

  const closeModal = useCallback(() => {
    dispatch(setModal(false));
    navigate(-1);
  }, []);

  return {
    openModal,
    closeModal,
  };
};
