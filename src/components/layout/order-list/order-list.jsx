import { useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderInfo } from '../../../services';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { OrderCard, Modal } from '../../ui-kit/';
import { useModal } from '../../../hooks/useModal';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './order-list.module.scss';
import { OrderListPropTypes } from './order-list.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
export function OrderList({ type }) {
  const dispatch = useDispatch();
  const isModalOpen = useSelector((store) => store.modal.isModalOpen);
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const orders = useSelector((store) => store[type].orders);

  return (
    <>
      <ul className={styles.wrapper}>
        {orders.map((order, index) => (
          <li
            className={styles.card}
            onClick={() => {
              dispatch(getOrderInfo(order));

              openModal();
              navigate(`${order.number}`, {
                state: { background: location },
                key: order.number,
              });
            }}
            key={order.number + 'list' + index}
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

/* #####################
ТИПЫ ===================
##################### */
OrderList.propTypes = OrderListPropTypes;
