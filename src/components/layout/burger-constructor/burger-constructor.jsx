import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Bun from '../../ui-kit/bun/bun';
import IngredientsSelected from '../../ui-kit/ingredients-selected/ingredients-selected';
import Modal from '../../ui-kit/modal/modal';
import OrderDetails from '../../ui-kit/order-details/order-details';
import { useModal } from '../../../hooks/useModal';
import { useSelector, useDispatch } from 'react-redux';

/* ####################
СТИЛИ и ТИПИЗАЦИЯ ======
##################### */
import styles from './burger-constructor.module.scss';
import { BurgerConstructorPropTypes } from './burger-constructor.types.js';
import { sendOrder } from '../../../services/order/actions';
import { resetQuantity } from '../../../services/ingredients/reducer';

/* ####################
|||||||||||||||||||||||
##################### */
export function BurgerConstructor({ className }) {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const { isModalOpen, openModal, closeModal } = useModal();

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
          {order.price}
          <CurrencyIcon type="primary" />
        </span>
        <Button
          htmlType="button"
          type="primary"
          size="large"
          onClick={() => {
            openModal();
            dispatch(sendOrder());
            dispatch(resetQuantity());
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
