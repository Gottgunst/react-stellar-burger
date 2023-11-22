import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderStatus } from '../../../utils/data';
import moment from 'moment';
import 'moment/locale/ru';
import { Loading } from '../../ui-kit';
import { useLocation, useParams } from 'react-router-dom';
import { loadOneOrder, setFocus } from '../../../services';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './order-details.module.scss';
import { OrderDetailsPropTypes } from './order-detalis.types.js';

/* ####################
|||||||||||||||||||||||
##################### */

export function OrderDetails({ type }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { focus, loading, oneOrder } = useSelector((store) => store.modal);
  const { isModalOpen } = useSelector((store) => store.modal);
  const { itemsMap } = useSelector((store) => store.ingredients);
  const { orders } = useSelector((store) => store[type]);
  const time = moment(focus?.createdAt).locale('ru').calendar();

  const background = location.state && location.state.background;

  useEffect(() => {
    console.log();

    // if (oneOrder) dispatch(setFocus(oneOrder));

    if (!background && orders.length === 0) {
      if (!oneOrder) dispatch(loadOneOrder(id));
      dispatch(setFocus(oneOrder));
    } else dispatch(setFocus(orders[id]));
  }, [isModalOpen, orders, id, oneOrder]);

  return loading || !focus ? (
    <Loading />
  ) : (
    <div className={styles.wrapper}>
      <p className={styles.digit}>#{focus?.number}</p>
      <h3 className={styles.title}>{focus?.name}</h3>
      <span className={styles.status}>{orderStatus[focus?.status]}</span>

      <h3 className={styles.title}>Состав:</h3>
      <ul className={styles.list}>
        {focus?.ingredients?.map((item, index) => (
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
          {focus?.cost}
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
}

/* #####################
ТИПЫ ===================
##################### */
OrderDetails.propTypes = OrderDetailsPropTypes;
