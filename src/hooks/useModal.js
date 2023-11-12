import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getInfo } from '../services';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../utils/data';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const openModal = useCallback((target, id) => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    dispatch(getInfo(null));

    //временное условие для работы с оформлением заказа
    if (location.pathname === '') navigate(-1);
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
