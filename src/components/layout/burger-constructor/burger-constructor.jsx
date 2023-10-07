import { useContext } from 'react';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../ui-kit/modal/modal';
import OrderDetails from '../../ui-kit/order-details/order-details';
import { useModal } from '../../../hooks/useModal';
import { OrderContext } from '../../../utils/context';
import { burgerApi } from '../../../utils/data';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './burger-constructor.module.scss';
import { BurgerConstructorPropTypes } from './burger-constructor.types.js';
import Bun from '../../ui-kit/bun/bun';
import IngredientsSelected from '../../ui-kit/ingredients-selected/ingredients-selected';

/* ####################
|||||||||||||||||||||||
##################### */
export function BurgerConstructor({ className }) {
  const [orderState, dispatch] = useContext(OrderContext);

  const { isModalOpen, openModal, closeModal } = useModal();

  const createOrder = () => {
    const items = [...orderState.items, orderState.bun].map((e) => e._id);
    burgerApi
      .makeRequest('/orders', 'POST', {
        ingredients: items,
      })
      .then((res) => {
        dispatch({ act: 'complete', income: res });
      })
      .catch((err) => {
        console.warn('STATUS', err.status, '#######', err);
        return err;
      });
  };

  return (
    <div className={className + ' ' + styles.wrapper}>
      <ul className={styles.components}>
        <li className={styles.part}>
          <Bun type="top" />
        </li>
        <li className={styles.part}>
          <ul className={styles.components + ' ' + styles['components_inside']}>
            <IngredientsSelected />
          </ul>
        </li>
        <li className={styles.part}>
          <Bun type="bottom" />
        </li>
      </ul>
      <span className={styles.info}>
        <span className={styles.price}>
          {orderState.price}
          <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => {
            openModal();
            createOrder();
          }}
        >
          Оформить заказ
        </Button>
        <Modal status={isModalOpen} closeModal={closeModal}>
          <OrderDetails />
        </Modal>
      </span>
    </div>
  );
}

/* #####################
ТИПЫ ===================
##################### */
BurgerConstructor.propTypes = BurgerConstructorPropTypes;
