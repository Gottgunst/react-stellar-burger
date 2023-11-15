import React from 'react';
import { useCallback } from 'react';
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Bun, IngredientsSelected, Modal } from '../../ui-kit/';
import { OrderDetails } from '../';
import { useModal } from '../../../hooks/useModal';
import { useSelector, useDispatch } from 'react-redux';
import { sendOrder, resetQuantity, sortOrder } from '../../../services';
import { useDrop } from 'react-dnd';
import { PATH } from '../../../utils/data';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './burger-constructor.module.scss';
import { BurgerConstructorPropTypes } from './burger-constructor.types.js';

/* ####################
|||||||||||||||||||||||
##################### */
export function BurgerConstructor({ className }) {
  const order = useSelector((store) => store.order);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isModalOpen, openModal, closeModal } = useModal();

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'box',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;
  let stylesComponents = isActive
    ? [styles.components, styles['components_drop_ready']]
    : canDrop
    ? [styles.components, styles['components_drop_prepare']]
    : [styles.components];

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    dispatch(sortOrder({ dragIndex, hoverIndex }));
  }, []);

  return (
    <div className={className + ' ' + styles.wrapper}>
      <ul className={stylesComponents.join(' ')} ref={drop}>
        <li className={styles.part}>
          <Bun type="top" />
        </li>
        <li className={styles.part}>
          <ul className={styles.components + ' ' + styles['components_inside']}>
            {order.items.length > 0 ? (
              order.items.map((el, index) => (
                <IngredientsSelected
                  data={el}
                  index={index}
                  moveCard={moveCard}
                  key={el.key}
                />
              ))
            ) : (
              <div className="constructor-element"></div>
            )}
          </ul>
        </li>
        <li className={styles.part}>
          <Bun type="bottom" />
        </li>
      </ul>
      <span className={styles.info}>
        <span className={styles.price}>
          {order.price}
          <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => {
            console.log(user);
            if (user) {
              dispatch(sendOrder());
              openModal();
              // navigate(`${PATH.PROFILE}/${order.orderId}`, {
              //   state: { background: location },
              //   key: order.orderId,
              // });
              dispatch(resetQuantity());
            } else navigate(PATH.LOGIN);
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
