// import React, { useState } from 'react';
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

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './burger-constructor.module.scss';
import { BurgerConstructorPropTypes } from './burger-constructor.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
export function BurgerConstructor({ className, compound }) {
  // Временная булка
  const bun = compound.filter((el) => el.type === 'bun')[0];

  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <div className={className + ' ' + styles.wrapper}>
      <ul className={styles.components}>
        <li className={styles.part}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + ' (верх)'}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
        <li className={styles.part}>
          <ul className={styles.components + ' ' + styles['components_inside']}>
            {compound.map((el) =>
              el.type !== 'bun' ? (
                <li className={styles.component} key={el._id}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={el.name}
                    price={el.price}
                    thumbnail={el.image}
                  />
                </li>
              ) : null,
            )}
          </ul>
        </li>
        <li className={styles.part}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + ' (низ)'}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
      </ul>
      <span className={styles.info}>
        <span className={styles.price}>
          610
          <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={openModal}
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
