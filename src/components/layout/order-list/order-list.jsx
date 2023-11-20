import { useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderInfo, loadIngredients } from '../../../services';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { OrderCard, Modal } from '../../ui-kit/';
import { useModal } from '../../../hooks/useModal';
import { PATH } from '../../../utils/data';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './order-list.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */
export function OrderList() {
  const dispatch = useDispatch();
  const order = useSelector((store) => store.feed.focus);
  const isModalOpen = useSelector((store) => store.modal.isModalOpen);
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();

  useEffect(() => {
    // Инициализация данных из API
    // dispatch(loadIngredients());
    //очищаем фокус при перезагрузке страницы
    // dispatch(getOrderInfo(null));
  }, []);

  return (
    <>
      <ul className={styles.wrapper}>
        {[...new Array(10)].map((e, index) => (
          <li
            className={styles.card}
            onClick={() => {
              openModal();
              navigate(`card`, {
                state: { background: location },
                key: 'card',
              });
            }}
            key={'card' + index}
          >
            <OrderCard order={order} />
          </li>
        ))}
      </ul>
      <Modal status={isModalOpen} closeModal={closeModal}>
        <Outlet />
      </Modal>
    </>
  );
}
