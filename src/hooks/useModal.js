import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getInfo } from '../services';

export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    dispatch(getInfo(null));
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
