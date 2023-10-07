import { useContext, useEffect, useState } from 'react';
// import ReactDOM from 'react-dom';
import {
  ConstructorElement,
  DragIcon,
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
          {orderState.bun._id ? (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={orderState.bun.name + ' (верх)'}
              price={orderState.bun.price}
              thumbnail={orderState.bun.image}
            />
          ) : (
            <div className="constructor-element constructor-element_pos_top"></div>
          )}
        </li>
        <li className={styles.part}>
          <ul className={styles.components + ' ' + styles['components_inside']}>
            {orderState.items.length > 0 ? (
              orderState.items.map((el, index) => (
                <li className={styles.component} key={el._id + index}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={el.name}
                    price={el.price}
                    thumbnail={el.image}
                    handleClose={() => {
                      dispatch({ act: 'remove', income: index });
                    }}
                  />
                </li>
              ))
            ) : (
              <div className="constructor-element"></div>
            )}
          </ul>
        </li>
        <li className={styles.part}>
          {orderState.bun._id ? (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={orderState.bun.name + ' (низ)'}
              // price={orderState.bun.price / 2}
              thumbnail={orderState.bun.image}
            />
          ) : (
            <div className="constructor-element constructor-element_pos_bottom"></div>
          )}
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
