import { useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks/useRedux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { OrderCard, Modal } from 'components/ui-kit';
import { useModal } from 'hooks/useModal';
import { PATH, POINT, WebsocketStatus } from 'utils/data';
import { OrderDetails } from '../order-details/order-details';
import {
  feedWsConnect,
  feedWsDisconnect,
  myFeedWsConnect,
  myFeedWsDisconnect,
} from 'services';
/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './order-list.module.scss';
import { TFeedType } from 'types';
type TOrderListProps = { type: TFeedType };

/* ####################
|||||||||||||||||||||||
##################### */
export const OrderList: React.FC<TOrderListProps> = ({ type }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { status } = useSelector((store) => store[type]);
  const { openModal } = useModal();
  const { isModalOpen } = useSelector((store) => store.modal);
  const { orders } = useSelector((store) => store[type]);

  const background: boolean = location.state && location.state.background;
  const oneOrderFlag =
    location.pathname.includes(`/${PATH.ORDERS}/`) && !background;

  const url =
    type === 'feed'
      ? `${process.env.REACT_APP_WSS_URL}${POINT.ORDERS_ALL}`
      : `${process.env.REACT_APP_WSS_URL}${POINT.ORDERS}?token=${localStorage
          .getItem('accessToken')!
          .split(' ')
          .pop()}`;

  useEffect(() => {
    // Инициализация данных из WSS
    if (status === WebsocketStatus.OFFLINE) {
      dispatch(
        {
          feed: feedWsConnect(url),
          myFeed: myFeedWsConnect(url),
        }[type],
      );
    }
    return () => {
      dispatch(
        { feed: feedWsDisconnect(), myFeed: myFeedWsDisconnect() }[type],
      );
    };
  }, []);

  return !oneOrderFlag ? (
    <>
      <ul className={styles.wrapper}>
        {Object.keys(orders)
          .sort((a, b) => parseInt(b) - parseInt(a))
          .map((number, index) => {
            const order = orders[number];
            return (
              <li
                className={styles.card}
                onClick={() => {
                  openModal();
                  navigate(`${order.number}`, {
                    state: { key: order.number, background: location },
                  });
                }}
                key={order.number + 'list' + index}
              >
                <OrderCard order={order} />
              </li>
            );
          })}
      </ul>
      <Modal status={isModalOpen}>
        <Outlet />
      </Modal>
    </>
  ) : (
    <OrderDetails type={type} />
  );
};
