import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import ReactDOM from 'react-dom';
// import {   } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { orderStatus } from '../../../utils/data';
import moment from 'moment';
import 'moment/locale/ru';
import { Loading } from '../../ui-kit';
import { useParams } from 'react-router-dom';
import { setFocus } from '../../../services';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './order-details.module.scss';

/* ####################
|||||||||||||||||||||||
##################### */

export function OrderDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { focus } = useSelector((store) => store.modal);
  const { loading } = useSelector((store) => store.feed);
  const ingredients = useSelector((store) => store.ingredients.itemsMap);
  const time = moment(focus?.createdAt).locale('ru').calendar();

  // useEffect(() => {
  //   dispatch(setFocus(itemsMap[id]));
  // }, []);

  return focus === false || loading ? (
    <Loading />
  ) : (
    <div className={styles.wrapper}>
      <p className={styles.digit}>#{focus?.number}</p>
      <h2 className={styles.title}>{focus?.name}</h2>
      <span className={styles.status}>{orderStatus[focus?.status]}</span>

      <h3 className={styles.title}>Состав:</h3>
      <ul className={styles.list}>
        {focus?.ingredients?.map((id, index) => (
          <li
            className={styles.ingredient}
            key={ingredients[id]._id + 'list' + index}
          >
            <img
              className={styles.image}
              alt={ingredients[id].name}
              src={ingredients[id].image}
            />
            <div className={styles.name}>{ingredients[id].name}</div>
            <span className={styles.digit}>
              1 x {ingredients[id].price}
              <CurrencyIcon type="primary" />
            </span>
          </li>
        ))}
      </ul>

      <div className={styles.bottom}>
        <span>{time}</span>
        <span className={styles.digit}>
          510
          <CurrencyIcon type="primary" />
        </span>
      </div>
    </div>
  );
}
