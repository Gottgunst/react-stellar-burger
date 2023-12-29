import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'hooks/useRedux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderStatus } from 'utils/data';
import moment from 'moment';
import 'moment/locale/ru';
import { Loading } from '../../ui-kit';
import { useLocation, useParams } from 'react-router-dom';
import { loadOneOrder, setFocus } from 'services';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './order-details.module.scss';
import { IOrder, TFeedType } from 'types';

type TOrderDetailsProps = { type: TFeedType };

/* ####################
|||||||||||||||||||||||
##################### */
export const OrderDetails: React.FC<TOrderDetailsProps> = ({ type }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { focus, loading, oneOrder } = useSelector((store) => store.modal);
  const order = focus as IOrder;
  const { isModalOpen } = useSelector((store) => store.modal);
  const { itemsMap } = useSelector((store) => store.ingredients);
  const { orders } = useSelector((store) => store[type]);

  const time = moment(order?.createdAt)
    .locale('ru')
    .calendar();

  const background: boolean = location.state && location.state.background;

  useEffect(() => {
    console.log();

    // if (oneOrder) dispatch(setFocus(oneOrder));

    if (!background && (orders.length as unknown as number) === 0) {
      if (!oneOrder) dispatch(loadOneOrder(parseInt(id!)));
      dispatch(setFocus(oneOrder as IOrder));
    } else dispatch(setFocus(orders[parseInt(id!)]));
  }, [isModalOpen, orders, id, oneOrder]);

  return loading || !order ? (
    <Loading />
  ) : (
    <div className={styles.wrapper}>
      <p className={styles.digit}>#{order?.number}</p>
      <h3 className={styles.title}>{order?.name}</h3>
      <span className={styles.status}>{orderStatus[order?.status]}</span>

      <h3 className={styles.title}>Состав:</h3>
      <ul className={styles.list}>
        {order?.ingredients?.map((item, index) => (
          <li
            className={styles.ingredient}
            key={itemsMap[item.id]?._id + 'list' + index}
          >
            <img
              className={styles.image}
              alt={itemsMap[item.id]?.name}
              src={itemsMap[item.id]?.image}
            />
            <div className={styles.name}>{itemsMap[item.id]?.name}</div>
            <span className={styles.digit}>
              {item.q} x {itemsMap[item.id]?.price}
              <CurrencyIcon type="primary" />
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.bottom}>
        <span>{time}</span>
        <span className={styles.digit}>
          {order?.cost}
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
};
