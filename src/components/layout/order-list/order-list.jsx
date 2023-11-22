import { useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  Outlet,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { OrderCard, Modal } from '../../ui-kit/';
import { useModal } from '../../../hooks/useModal';
import { PATH } from '../../../utils/data';
import { OrderDetails } from '../order-details/order-details';
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
  const location = useLocation();
  const navigate = useNavigate();
  const { openModal, closeModal } = useModal();
  const { isModalOpen } = useSelector((store) => store.modal);
  const { orders } = useSelector((store) => store[type]);

  const background = location.state && location.state.background;
  const oneOrderFlag =
    location.pathname.includes(`/${PATH.ORDERS}/`) && !background;

  return !oneOrderFlag ? (
    <>
      <ul className={styles.wrapper}>
        {Object.keys(orders)
          .sort((a, b) => b - a)
          .map((number, index) => {
            const order = orders[number];
            return (
              <li
                className={styles.card}
                onClick={() => {
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
            );
          })}
      </ul>
      <Modal status={isModalOpen} closeModal={closeModal}>
        <Outlet />
      </Modal>
    </>
  ) : (
    <OrderDetails type={type} />
  );
}

/* #####################
ТИПЫ ===================
##################### */
OrderList.propTypes = OrderListPropTypes;
