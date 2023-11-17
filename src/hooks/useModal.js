import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getInfo, setModal } from '../services';
import { useLocation, useNavigate } from 'react-router-dom';

export const useModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = useCallback(() => {
    dispatch(setModal(true));
  }, []);

  const closeModal = useCallback(() => {
    dispatch(setModal(false));
    dispatch(getInfo(null));

    navigate(-1);
  }, []);

  return {
    openModal,
    closeModal,
  };
};
