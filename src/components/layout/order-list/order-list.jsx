import { useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderInfo, setFocus } from '../../../services';
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

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './order-list.module.scss';
import { OrderListPropTypes } from './order-list.types.js';
import { OrderDetails } from '../order-details/order-details';

/* ####################
|||||||||||||||||||||||
##################### */
export function OrderList({ type }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { openModal, closeModal } = useModal();
  const { isModalOpen } = useSelector((store) => store.modal);
  const { orders } = useSelector((store) => store[type]);

  const background = location.state && location.state.background;
  const oneOrderFlag =
    location.pathname.includes(`/${PATH.ORDERS}/`) && !background;

  return !oneOrderFlag ? (
    <>
      <ul className={styles.wrapper}>
        {orders?.map((order, index) => (
          <li
            className={styles.card}
            onClick={() => {
              dispatch(setFocus(order));

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
  ) : (
    <OrderDetails />
  );
}

/* #####################
ТИПЫ ===================
##################### */
OrderList.propTypes = OrderListPropTypes;
